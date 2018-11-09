import mongoose = require("mongoose");

export interface IRepositoryBase {
    create(item: any, selectedFields?: string[]): any;
    retrieveAll(filter?: any, selectedFields?: string[], lean?: boolean): any;
    retrieve(page?: number, pageSize?: number, filter?: any, selectedFields?: string[], sortBy?: any, lean?: boolean, populates?: Array<any>): any;
    findByIdAndUpdate(item: any, lean: boolean): any;
    updateById(id: string, fields: Object, selectedFields?: string[], options?: any): any;
    update(cond: Object, update: Object, options?: Object, selectedFields?: string[]): any;
    deleteById(id: string): any;
    delete(cond: Object): any;
    findById(id: string, selectedFields?: string[], lean?: boolean, populates?: Array<any>): any;
    findOne(cond: Object, selectedFields?: string[], lean?: boolean, populates?: Array<any>): any;
    findOneAndUpdate(cond: Object, update: Object, options?: Object, selectedFields?: string[]): any;
    findByObject(item: any, selectedFields?: string[], populateFields?: string, lean?: boolean): any;
    count(item: any): any;
    exists(item: any): Promise<boolean>;
    toObjectId(id: string): mongoose.Types.ObjectId;
}