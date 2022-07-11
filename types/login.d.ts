interface AdminLoginItf {
	password: string;
	username: string;
}
interface LoginResItf<T={}> {
	code: number;
	message: "";
	data: T;
}
interface LoginDataItf {
	tokenHead: string;
	token: string;
}
