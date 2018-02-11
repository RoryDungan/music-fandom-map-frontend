/** 
 * Dictionary of country codes and stream numbers.
 */
export type StreamStats = { [id: string]: number };

/**
 * Stats for a specified country for a given artist
 */
export interface IArtistStats {
    name: string,
    streams: StreamStats,
    imageUrl?: string,
    description?: string
}
