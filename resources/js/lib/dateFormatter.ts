// lib/utils/dateFormatter.ts (অথবা আপনার যে কোনো ইউটিলিটি ফাইল)

/**
 * Converts a date string or Date object to a localized string.
 * Defaults to Bengali (bn-BD) format if no locale is provided.
 *
 * @param dateInput The date string (e.g., ISO string) or Date object to format.
 * @param format The locale string (e.g., 'bn-BD' for Bengali, 'en-US' for English).
 * Defaults to 'bn-BD'.
 * @returns The formatted date string in the specified locale.
 * ৩০ জনু, ২০২৫
 */
export function formatToBengaliDate(dateInput: string | Date, format: string = 'bn-BD'): string {
    const dateObject = new Date(dateInput);

    // Check if the dateObject is valid
    if (isNaN(dateObject.getTime())) {
        console.warn('Invalid date input provided to formatToBengaliDate:', dateInput);
        return 'Invalid Date'; // Or throw an error, or return an empty string
    }

    // Options for full date format
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return dateObject.toLocaleDateString(format, options);
}

// আপনি যদি একটি সংক্ষিপ্ত ফরম্যাটের জন্য আলাদা ফাংশন রাখতে চান:
/**
 * Converts a date string or Date object to a short localized string.
 * Defaults to Bengali (bn-BD) format if no locale is provided.
 *
 * @param dateInput The date string (e.g., ISO string) or Date object to format.
 * @param format The locale string (e.g., 'bn-BD' for Bengali, 'en-US' for English).
 * Defaults to 'bn-BD'.
 * @returns The short formatted date string in the specified locale.
 */
export function formatToBengaliShortDate(dateInput: string | Date, format: string = 'bn-BD'): string {
    const dateObject = new Date(dateInput);

    if (isNaN(dateObject.getTime())) {
        console.warn('Invalid date input provided to formatToBengaliShortDate:', dateInput);
        return 'Invalid Date';
    }

    // No specific options are provided here, allowing toLocaleDateString to use its default short format
    return dateObject.toLocaleDateString(format);
}
