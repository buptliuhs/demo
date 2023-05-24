/**
 *
 * Matthew Dyer to Everyone (5:05 PM)
 Imagine we have a system that stores files, and these files can be grouped into collections. We are interested in knowing where our resources are being taken up.

 For this system we would like to generate a report that lists:

 The total size of all files stored; and

 The top N collections (by file size) where N can be a user-defined value
 file1.txt (size: 100)
 file2.txt (size: 200) in collection "collection1"/"collection2"
 file3.txt (size: 200) in collection "collection1"
 file4.txt (size: 300) in collection "collection2"
 file5.txt (size: 10)
 */

export interface FileInfo {
    name: string;
    size: number;
    collection?: string;
}

export interface FileInfo2 {
    name: string;
    size: number;
    collections: string[];
}

export interface Result {
    collections: string[];
    totalSize: number;
}

/**
 *
 * @param files
 * @param n
 */
export function topNCollections(files: FileInfo2[], n: number): Result {
    let totalSize = 0;
    const collectionInfoMap: Map<string, number> = new Map<string, number>();
    files.forEach((f) => {
        totalSize += f.size;
        f.collections.forEach((c) => {
            if (collectionInfoMap.has(c)) {
                collectionInfoMap.set(c, collectionInfoMap.get(c)! + f.size);
            } else {
                collectionInfoMap.set(c, f.size);
            }
        })
    });
    // Get top N collections by size
    const list = Array.from(collectionInfoMap.entries());
    // Sort based on size
    const sortedCollectionList: string[] = list.sort((a, b) => b[1] - a[1]).map((e) => e[0]);
    return {
        collections: sortedCollectionList.slice(0, n),
        totalSize,
    };
}
