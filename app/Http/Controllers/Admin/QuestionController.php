<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\QCategory;
use App\Models\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        // ক্যাটাগরি প্যারামিটার আছে কি না তা যাচাই করা
        $questionsQuery = Question::with('options')->orderBy('created_at', 'desc');

        if ($request->has('category') && $request->category !== 'All') {
            $questionsQuery->where('category_id', $request->category);
        }

        // ক্যাটাগরি ডেটা সংগ্রহ করা
        $categories = QCategory::all();

        return Inertia::render('admin/questions/index', [
            'questions' => $questionsQuery->get(),
            'categories' => $categories,
            'selectedCategory' => $request->category ?? 'All',
        ]);
    }
    public function create(Request $request)
    {
        $categories = QCategory::all();
        return Inertia::render('admin/questions/create', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:q_categories,id',
            'question_text' => 'required|string',
            'description' => 'nullable|string',
            'options' => 'required|array|size:4',
            'options.*.option_text' => 'required|string',
            'options.*.is_correct' => 'boolean',
            'correct_option_index' => 'required|integer|min:0|max:3'
        ]);

        DB::transaction(function () use ($validated) {
            $question = Question::create([
                'category_id' => $validated['category_id'],
                'question_text' => $validated['question_text'],
                'description' => $validated['description'],
                'user_id' => auth()->id()
            ]);

            foreach ($validated['options'] as $index => $optionData) {
                $question->options()->create([
                    'option_text' => $optionData['option_text'],
                    'is_correct' => ($index == $validated['correct_option_index']),
                ]);
            }
        });

        return redirect()->route('admin.questions.index')->with('success', 'Question created successfully.');
    }

    public function edit(Question $question)
    {
        // ক্যাটাগরি এবং অপশনসহ প্রশ্নটি লোড করা হচ্ছে
        $question->load('options', 'category');
        $categories = QCategory::all();

        return Inertia::render('admin/questions/edit', [
            'question' => $question,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * এই ফাংশনটি ফর্ম থেকে আসা ডেটা দিয়ে একটি প্রশ্ন আপডেট করার জন্য ব্যবহৃত হয়।
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Question $question
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, Question $question)
    {
        // ইনপুট ভ্যালিডেশন
        $validatedData = $request->validate([
            'question_text' => 'required|string|max:255',
            'category_id' => 'required|exists:q_categories,id',
            'options' => 'required|array|min:2',
            'options.*.option_text' => 'required|string|max:255',
            // 'is_correct' ভ্যালিডেশন nullable করা হয়েছে কারণ আনচেক করা চেক বক্স ভ্যালু পাঠায় না।
            'options.*.is_correct' => 'nullable|boolean',
            'description' => 'nullable|string',
        ]);

        // ডেটাবেজ লেনদেন শুরু করা হচ্ছে যাতে পুরো প্রক্রিয়াটি সফল বা ব্যর্থ হয়।
        DB::beginTransaction();

        try {
            // প্রশ্ন আপডেট করা হচ্ছে
            $question->update([
                'question_text' => $validatedData['question_text'],
                'category_id' => $validatedData['category_id'],
                'description' => $validatedData['description'] ?? null,
            ]);

            // পুরোনো অপশনগুলো মুছে ফেলা হচ্ছে
            $question->options()->delete();

            // নতুন অপশন তৈরি করা হচ্ছে এবং নিশ্চিত করা হচ্ছে যে is_correct ফিল্ডটি আছে।
            $optionsToCreate = collect($validatedData['options'])->map(function ($option) {
                return [
                    'option_text' => $option['option_text'],
                    'is_correct' => $option['is_correct'] ?? false, // যদি is_correct না থাকে তবে false ধরা হবে
                ];
            })->toArray();

            $question->options()->createMany($optionsToCreate);

            // যদি সবকিছু ঠিক থাকে, তবে লেনদেন সম্পন্ন করা হচ্ছে।
            DB::commit();

            // সফলভাবে আপডেটের পর একটি রিডাইরেক্ট করা হচ্ছে
            return redirect()->route('admin.questions.index')->with('success', 'Question updated successfully!');

        } catch (\Exception $e) {
            // যদি কোনো সমস্যা হয়, তবে সব পরিবর্তন বাতিল করা হচ্ছে।
            DB::rollBack();

            // এখানে আপনি সমস্যাটি লগ করতে পারেন
            \Log::error('Failed to update question: ' . $e->getMessage());

            // একটি ত্রুটির বার্তা সহ রিডাইরেক্ট করা হচ্ছে
            return redirect()->back()->with('error', 'Failed to update the question. Please try again.');
        }
    }


    /**
     * Remove the specified resource from storage.
     * এই ফাংশনটি একটি নির্দিষ্ট প্রশ্ন ডিলিট করার জন্য ব্যবহৃত হয়।
     *
     * @param \App\Models\Question $question
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Question $question)
    {
        // প্রশ্ন এবং তার সাথে যুক্ত অপশনগুলো ডিলিট করা হচ্ছে
        $question->options()->delete();
        $question->delete();

        // সফলভাবে ডিলিটের পর একটি রিডাইরেক্ট করা হচ্ছে
        return redirect()->route('admin.questions.index')->with('success', 'Question deleted successfully!');
    }
}
