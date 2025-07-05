import { EmployeeType, UserType, UserFormData } from '@/types/globals';

export function transformEmployeeToFormData(employee: EmployeeType): {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    department_id: number | string;
    designation_id: number | string;
    user_id: number | string;
    pf_number: string;
    joining_date: string;
    date_of_birth: string;
    blood_group: string;
    emergency_contact: string;
    bank_account_number: string;
    bank_name: string;
    verify: string;
    media_id: number | null | undefined;
    status: boolean;
    present_address: string;
    permanent_address: string;
    about: string
} {
    return {
        id: employee.id,
        name: employee.name ?? '',
        email: employee.email ?? '',
        phone: employee.phone ?? '',
        position: employee.position ?? '',
        department_id: employee.department?.id ?? '',
        designation_id: employee.designation?.id ?? '',
        user_id: employee.user?.id ?? '',
        pf_number: employee.pf_number ?? '',
        joining_date: employee.joining_date ?? '',
        date_of_birth: employee.date_of_birth ?? '',
        blood_group: employee.blood_group ?? '',
        emergency_contact: employee.emergency_contact ?? '',
        bank_account_number: employee.bank_account_number ?? '',
        bank_name: employee.bank_name ?? '',
        verify: employee.verify ?? '',
        media_id: employee.media?.id ?? null,
        status: !!Number(employee.status), // ✅ convert "1" | "0" into true | false
        present_address: employee.present_address ?? '',
        permanent_address: employee.permanent_address ?? '',
        about: employee.about ?? '',
    };
}
export function getImageUrl(path?: string | null, width = 300, height = 200, text = 'No Image') {
    const baseUrl = window.location.origin;
    if (!path) {
        return `https://placehold.co/${width}x${height}?text=${encodeURIComponent(text)}`;
    }

    return `${baseUrl}/storage/${path}`;
}

export function transformFormDataToUserData( user: UserType): UserFormData {
    return {
        id: user.id,
        name: user.name ?? '',
        email: user.email ?? '',
        phone: user.phone ?? '',
        status: !!Number(user.status), // ✅ convert "1" | "0" into true | false
        about: user.about ?? '',
        email_verified_at: user.email_verified_at ?? '',
        media_id: user.media?.id ?? null,
    };

}

export function formatDateTime(dateString: string | Date, locale = 'en-US') {
    const date = new Date(dateString);
    return date.toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
}
