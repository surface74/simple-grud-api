export enum ApiPath {
  GetAll = '/api/users',
  GetUser = ApiPath.GetAll + '/',
  CreateUser = GetAll,
  UpdateUser = GetUser,
  DeleteUser = GetUser,
}
