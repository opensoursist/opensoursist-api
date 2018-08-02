/* eslint no-use-before-define: 0, space-infix-ops: 0 */
import { Document, Schema, model } from 'mongoose';

// 将 MongoDB 的 schemaDefinition 转化为 ts 的 type
type SchemaDefinitionToType<T> = {
    [K in keyof T]: T[K] extends new (...arga: any[]) => any ?
        (
            InstanceType<T[K]> extends Number ? number :
            InstanceType<T[K]> extends String ? string :
            InstanceType<T[K]> extends Date ? string :
            InstanceType<T[K]>
        ) : SchemaDefinitionToType<T[K]>
};

const schemaDefinition = {
    user_id: String,
    email: String
};

export type UserType = SchemaDefinitionToType<typeof schemaDefinition>;

const UserSchema = new Schema(schemaDefinition);

interface UserDocument extends Document, UserType {}
export default model<UserDocument>('User', UserSchema);
