export interface IService {
    findAll(userId: string): Promise<any>;
    findById(id: string): Promise<any>
    create(user: any): Promise<any>
    update(updateUser: any): Promise<any>
    delete(deleteUser: any): Promise<any>
}