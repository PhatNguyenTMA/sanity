export interface IBaseService<T> {
    retrieve: (page: number, pageSize: number) => any;
    findById: (_id: string) => any;
    create: (item: any) => any;
    update: (_id: string, item: any) => any;
    delete: (_id: string) => any;
    findByKeyValue: (key: string, value: string, select?: string[]) => any;
    findByObject: (object: any, select?: string[]) => any;
}