const _ = require("lodash");
const Q = require("q");
import * as ERRORS from "../Common/ErrorCode";
import {createAppError} from "../Common/AppError";
import {Logger} from "../logs/Logger";
import mongoose = require("mongoose");
import {IRepositoryBase} from "./IRepositoryBase";

export class RepositoryBase implements IRepositoryBase {
    private _model: mongoose.Model<mongoose.Document>;

    constructor(schemaModel: mongoose.Model<mongoose.Document>) {
        this._model = schemaModel;
    }


    /**
     * @Description create new record into SchemaModel
     * @author Phat Nguyen
     * @param item
     * @param selectedFields
     */
    create(item: any, selectedFields?: string[]): any {
        return Q(this._model.create(item))
            .then((rs) => {
                if (selectedFields) {
                    let itemRT = _.pick(rs, selectedFields);
                    itemRT._id = rs._id;
                    return itemRT;
                }
                return rs;
            });
    }

    /**
     * @Description get all records in SchemaModel
     * @author Phat Nguyen
     * @param filter
     * @param selectedFields
     * @param lean
     */
    retrieveAll(filter?: any, selectedFields?: string[], lean: boolean = true): any {
        let query = this._model.find(filter);
        if (selectedFields) {
            query = query.select(selectedFields.join(" "));
        }

        return Q.all([this._model.count(filter), query.lean(lean).exec()]);
    }

    /**
     * @author Phat Nguyen
     * @param page
     * @param pageSize
     * @param filter
     * @param selectedFields
     * @param sortBy
     * @param lean
     * @param populates
     */
    retrieve(page?: number, pageSize?: number, filter?: any, selectedFields?: string[], sortBy?: any, lean: boolean = true, populates?: Array<any>): any {
        let query = this._model.find(filter);
        if (sortBy) {
            query = query.sort(sortBy);
        }

        if (page) {
            query = query.skip((page - 1) * pageSize);
            query = query.limit(pageSize);
        }

        if (selectedFields) {
            query = query.select(selectedFields.join(" "));
        }

        if (populates) {
            this.populate(query, populates);
        }

        return Q.all([this._model.count(filter).exec(), query.lean(lean).exec()]);
    }

    /**
     * @author Phat Nguyen
     * @param item
     * @param lean
     */
    findByIdAndUpdate(item: any, lean: boolean = true): any {
        return this._model.findByIdAndUpdate(item._id, item, {new: true})
            .lean(lean)
            .exec().then((rs) => {
                if (rs != null) {
                    return rs;
                } else {
                    let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                    msgError.message = "The key " + item._id + " could not be found in " + this._model.collection.collectionName + " collection";
                    Logger.error(msgError.message);
                    throw createAppError(msgError);
                }
            });
    }

    /**
     * @author Phat Nguyen
     * @param id
     * @param fields
     * @param selectedFields
     * @param options
     */
    updateById(id: string, fields: Object, selectedFields?: string[], options?: any): any {
        let query = this._model.findByIdAndUpdate(id, fields, options || {new: true});
        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join(" "));
        }
        return query.exec().then((rs) => {
            if (rs) {
                return rs;
            } else {
                let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                msgError.message = "The key " + id + " could not be found in " + this._model.collection.collectionName + " collection";
                Logger.error(msgError.message);
                throw createAppError(msgError);
            }
        });
    }

    update(cond: Object, update: Object, options?: Object, selectedFields?: string[]): any {
        let query = this._model.update(cond, update, options || {new: true});
        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join(" "));
        }

        return query.exec().then((rs) => {
            if (rs) {
                return rs;
            } else {
                let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                msgError.message = "The object with filter " + JSON.stringify(cond) + " could not be found in " + this._model.collection.collectionName + " collection";
                Logger.error(msgError.message);
                throw createAppError(msgError);
            }
        });
    }

    /**
     * @Description Delete by Id Object
     * @author Phat Nguyen
     * @param id
     */
    deleteById(id: string): any {
        return this._model.remove({_id: this.toObjectId(id)}).exec().then((rs) => {
            if (rs["result"]["n"] === 0) {
                let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                msgError.message = "The key " + id + " could not be found in " + this._model.collection.collectionName + " collection";
                throw createAppError(msgError);
            }
            // return total row delete
            return rs["result"];
        });
    }

    /**
     * @author Phat Nguyen
     * @param cond
     */
    delete(cond: Object): any {
        return this._model.remove(cond).exec().then((rs) => {
            if (rs["result"]["n"] === 0) {
                let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                msgError.message = "The object with filter " + JSON.stringify(cond) + " could not be found in " + this._model.collection.collectionName + " collection";
                throw createAppError(msgError);
            }
            // return total row delete
            return rs["result"];
        });
    }

    /**
     * @Description get record via Id
     * @author Phat Nguyen
     * @param id
     * @param selectedFields
     * @param lean
     * @param populates
     */
    findById(id: string, selectedFields?: string[], lean: boolean = true, populates?: Array<any>): any {
        let query = this._model.findById(id);

        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join((" ")));
        }

        if (populates) {
            this.populate(query, populates);
        }

        return query.lean(lean).exec()
            .then((rs) => {
                if (rs) {
                    return rs;
                } else {
                    let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                    msgError.message = "The key " + id + " could not be found in " + this._model.collection.collectionName + " collection";
                    throw createAppError(msgError);
                }
            });
    }

    /**
     * @Description get record via condition with type Object
     * @author Phat Nguyen
     * @param cond
     * @param selectedFields
     * @param lean
     * @param populates
     */
    findOne(cond: Object, selectedFields?: string[], lean?: boolean, populates?: Array<any>): any {
        let query = this._model.findOne(cond);

        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join((" ")));
        }

        if (populates) {
            this.populate(query, populates);
        }

        return query.lean(lean).exec()
            .then((rs) => {
                if (rs) {
                    return rs;
                } else {
                    let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                    msgError.message = "The object with filter " + JSON.stringify(cond) + " could not be found in " + this._model.collection.collectionName + " collection";
                    throw createAppError(msgError);
                }
            });
    }

    findOneAndUpdate(cond: Object, update: Object, options?: Object, selectedFields?: string[]): any {
        let query = this._model.findOneAndUpdate(cond, update, options || { new: true });

        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join((" ")));
        }

        return query.exec().then((rs) => {
            if (rs) {
                return rs;
            } else {
                let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                msgError.message = "The object with filter " + JSON.stringify(cond) + " could not be found in " + this._model.collection.collectionName + " collection";
                throw createAppError(msgError);
            }
        });
    }

    findByObject(item: any, selectedFields?: string[], populateFields?: string, lean?: boolean): any {
        let query = this._model.findByObject(item);

        if (selectedFields && selectedFields.length) {
            query = query.select(selectedFields.join((" ")));
        }

        if (populateFields && populateFields.length) {
            query.populate(populateFields);
        }

        return query.lean(lean).exec()
            .then((rs) => {
                if (rs) {
                    return rs;
                } else {
                    let msgError = ERRORS.VALIDATION.KEY_NOT_FOUND;
                    msgError.message = "The object with filter " + JSON.stringify(item) + " could not be found in " + this._model.collection.collectionName + " collection";
                    throw createAppError(msgError);
                }
            });
    }

    /**
     * @Description get number of record by data item, example: item: {name: myName} ==> return number object has name is myName
     * @author Phat Nguyen
     * @param item
     */
    count(item: any): any {
        return this._model.count(item);
    }

    /**
     * @Description check item is exist or not
     * @author Phat Nguyen
     * @param item
     */
    exists(item: any): Promise<boolean> {
        return this._model.count(item).then((count) => {
            return count > 0;
        });
    }

    /**
     * @param id
     * @returns {ObjectID}
     */
    toObjectId(id: string): mongoose.Types.ObjectId {
        return mongoose.Types.ObjectId.createFromHexString(id);
    }

    /**
     * @Description function allow populate, join to SchemaModel another, similar to foreign key at SQL
     * @author Phat Nguyen
     * @param query
     * @param populates
     */
    private populate(query: any, populates?: Array<any>) {
        populates.map((populate) => {
            if (populate.collection) {
                let populateObj = {path: populate.collection};
                if (populate.fields) {
                    populateObj["select"] = populate.fields.join(" ");
                }
                if (populate.condition) {
                    populateObj["match"] = populate.condition;
                }
                query = query.populate(populateObj);
            }
        });
    }
}