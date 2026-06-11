export const API_URL = import.meta.env.VITE_API_URL || 'https://ocean-app.1m85g5.easypanel.host/api';

export interface Service {
    id: number;
    title: string;
    description: string;
    icon_url?: string;
    display_order: number;
}

export interface Project {
    id: number;
    title: string;
    description: string;
    image_url: string;
    category?: string;
    created_at: string;
    images?: Array<{ url: string; order: number }>;
    video_url?: string;
    tags?: string[];
    cover_image_index?: number;
}

export const getMediaUrl = (url?: string | null) => {
    if (!url) return '';
    if (url.startsWith('/upload')) {
        return `https://ocean-app.1m85g5.easypanel.host${url}`;
    }
    return url;
};

export async function fetchServices(): Promise<Service[]> {
    try {
        const response = await fetch(`${API_URL}/services`);
        if (!response.ok) throw new Error('Failed to fetch services');
        const services = await response.json();
        return services.map((s: any) => ({
            ...s,
            icon_url: getMediaUrl(s.icon_url)
        }));
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function fetchProjects(): Promise<Project[]> {
    try {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const projects = await response.json();
        return projects.map((p: any) => ({
            ...p,
            image_url: getMediaUrl(p.image_url),
            video_url: getMediaUrl(p.video_url),
            images: p.images?.map((img: any) => ({ ...img, url: getMediaUrl(img.url) }))
        }));
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
