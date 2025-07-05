import axios from 'axios'
import { MediaItem } from '@/types/globals';

export interface MediaResponse {
    data: MediaItem[]
    current_page: number
    last_page: number
}

export const fetchMedia = async (
    pageNum: number = 1,
    search: string = ''
): Promise<MediaResponse> => {
    const res = await axios.get(`/media?page=${pageNum}&search=${encodeURIComponent(search)}`)
    return res.data
}
