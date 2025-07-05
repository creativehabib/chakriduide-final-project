import users from '@/pages/admin/users';

export interface FlashProps {
    success?: string;
    error?: string;
}

export interface LinksType {
    url: string;
    label: string;
    active: boolean;
}
export interface MetaType {
    current_page: number;
    last_page: number;
    from: number;
    to: number;
    total: number;
    links: LinksType[];
}

export interface UserType {
    id: number;
    name: string;
    email: string;
    media: MediaItem;
    phone: string;
    status: boolean;
    about: string;
    email_verified_at: string;
    media_id: number | null | undefined;
    created_at: string;
    updated_at: string;
    profile_image: string;
}
export interface PostType {
    id: number;
    title: string;
    content: string;
    category: string;
    status: boolean;
    media: MediaItem;
    media_id: number | string;
    created_at: string;
    updated_at: string;
}

export interface DesignationType {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: boolean;
}

export interface CategoryType {
    id: number;
    name: string;
    slug: string;
    description: string;
    status: boolean;
    media: MediaItem | null;
    meta_image: MediaItem | null;
    blogs: BlogType [];
    media_id?: number | null;
    user: UserType | null;
    created_at: string;
    updated_at: string;

}

export interface DepartmentType {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    status: boolean;
    user: UserType;
    department_image: string;
}
export interface EmployeeType {
    id: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    designation: DesignationType;
    department: DepartmentType;
    media: MediaItem;
    user: UserType;
    joining_date: string;
    status: boolean;
    date_of_birth: string;
    blood_group: string;
    emergency_contact: string;
    present_address: string;
    permanent_address: string;
    bank_account_number: string;
    bank_name: string;
    pf_number: string;
    verify: string;
    about: string;
    designation_id: number | string;
    department_id: number | string;
    media_id: number | null | undefined;
    user_id: string;
    created_at: string;
    updated_at: string;
}

export interface EmployeeFormData {
    [key: string]: string | number | boolean | File | null | undefined; // ✅ Allow string keys with File and null types
    id?: number;
    name: string;
    email: string;
    phone: string;
    position: string;
    department_id: string | number;
    designation_id: string | number;
    user_id?: string | number;
    pf_number: string;
    joining_date: string;
    date_of_birth: string;
    blood_group: string;
    emergency_contact: string;
    bank_account_number: string;
    bank_name: string;
    verify: string;
    status: boolean;
    present_address: string;
    media_id: number | null | undefined;
    permanent_address: string;
    about: string;
}

export interface UserFormData {
    [key: string]: string | number | boolean | File | null | undefined; // ✅ Allow string keys with File and null types
    id?: number;
    name: string;
    email: string;
    phone: string;
    status: boolean;
    about: string;
    email_verified_at: string;
    media_id: number | null | undefined;
}
export interface BloodGroupType {
    id: number;
    name: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export type MediaItem = {
    id: number | null | undefined;
    name: string;
    filename: string;
    path: string;
    mime_type: string;
    size: number;
    type: string;
    created_at: string;
    updated_at: string;
    width: number;
    height: number;
    user: UserType;
};
export interface BloodTypeType {
    id: number;
    name: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export interface BlogType {
    id: number;
    name: string;
    slug: string;
    category_id: string;
    description: string;
    meta_title: string;
    meta_description: string;
    is_featured: boolean;
    status: string;
    category: CategoryType;
    content: string;
    media: MediaItem | null;
    meta_image: MediaItem | null;
    user: UserType | null;
    media_id?: number | null;
    og_img_id?: number | null;
    allow_comments?: boolean;
    index: boolean;
    created_at: string;
    updated_at: string;
}
