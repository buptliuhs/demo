import { FileInfo2, topNCollections } from "../src/file-systems";

describe("file-system", () => {
    it("Top 3", () => {
        const files: FileInfo2 [] = [
            {
                name: 'file1.txt',
                size: 100,
                collections: [],
            },
            {
                name: 'file2.txt',
                size: 100,
                collections: ['collection1']
            },
            {
                name: 'file3.txt',
                size: 300,
                collections: ['collection1', 'collection3'],
            },
            {
                name: 'file4.txt',
                size: 500,
                collections: ['collection2']
            },
            {
                name: 'file5.txt',
                size: 10,
                collections: [],
            }
        ];
        const result = topNCollections(files, 2);
        expect(result.collections).toEqual(['collection2', 'collection1']);
        expect(result.totalSize).toBe(1010);
    });
    //
    // it("Top 2 - another", () => {
    //     const files: FileInfo [] = [
    //         {
    //             name: 'file1.txt',
    //             size: 100,
    //         },
    //         {
    //             name: 'file2.txt',
    //             size: 200,
    //             collection: 'collection1'
    //         },
    //         {
    //             name: 'file3.txt',
    //             size: 200,
    //             collection: 'collection1'
    //         },
    //         {
    //             name: 'file4.txt',
    //             size: 500,
    //             collection: 'collection2'
    //         },
    //         {
    //             name: 'file5.txt',
    //             size: 10,
    //         }
    //     ];
    //     const result = topNCollections(files, 3);
    //     expect(result.collections).toEqual(['collection2', 'collection1']);
    //     expect(result.totalSize).toBe(1010);
    // });
    //
    //
    // it("Top 3", () => {
    //     const files: FileInfo [] = [
    //         {
    //             name: 'file1.txt',
    //             size: 100,
    //         },
    //         {
    //             name: 'file2.txt',
    //             size: 200,
    //             collection: 'collection1'
    //         },
    //         {
    //             name: 'file3.txt',
    //             size: 200,
    //             collection: 'collection1'
    //         },
    //         {
    //             name: 'file4.txt',
    //             size: 500,
    //             collection: 'collection2'
    //         },
    //         {
    //             name: 'file6.txt',
    //             size: 500,
    //             collection: 'collection3'
    //         },
    //         {
    //             name: 'file7.txt',
    //             size: 600,
    //             collection: 'collection4'
    //         },
    //         {
    //             name: 'file5.txt',
    //             size: 10,
    //         }
    //     ];
    //     const result = topNCollections(files, 3);
    //     expect(result.collections).toEqual(['collection4', 'collection2', 'collection3']);
    //     expect(result.totalSize).toBe(2110);
    // });
});
