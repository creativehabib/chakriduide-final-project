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
    public function index()
    {
        $questions = Question::with(['category', 'options'])->get();
        return Inertia::render('admin/questions/index', ['questions' => $questions]);
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
}
