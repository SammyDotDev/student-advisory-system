import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

const API_URL = "http://localhost:8080/api/v1/";
export const api = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json",
	},
});
export const ApiClient = () => {
	const router = useRouter();
	const api = axios.create({
		baseURL: API_URL,
		headers: {
			"Content-Type": "application/json",
		},
	});
	api.interceptors.request.use(
		async (config) => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				config.headers.Authorization = `${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);
	createAxiosResponseInterceptor();

	function createAxiosResponseInterceptor() {
		const interceptor = api.interceptors.response.use(
			(response) => {
				console.log("RETURN REPONSE INSTEAD ERROR");
				return response;
			},
			async (error) => {
				console.log(error.response.status);
				console.log(error.response.data);

				if (error.response.status !== 401) {
					console.log("EROOR");
					return Promise.reject(error);
				}
				if (
					error.response.status === 401 &&
					localStorage.getItem("refreshToken")
				) {
					try {
						api.interceptors.response.eject(interceptor);
						const refreshToken = localStorage.getItem("refreshToken");
						console.error(
							"Error at API AXIOS",
							error.response.status,
							refreshToken
						);

						const url = `${API_URL}/api/v1/auth/refresh`;
						const body = {
							refreshToken: refreshToken,
						};

						const headers = {
							"Content-Type": "application/x-www-form-urlencoded",
						};

						const response = api.post(url, body, { headers });

						localStorage.setItem(
							"token",
							"Bearer " + (await response).data.accessToken
						);
						localStorage.setItem("refreshToken", response.data.refreshToken);

						error.response.config.headers[
							"Authorization"
						] = `Bearer + ${response.data.access_token}`;
						return axios(error.response.config);

						// const response = api.get(API_URL)
					} catch (error) {
						//If refresh token is invalid, you will receive this error status and log user out
						if (error.response.status === 400) {
							router.replace("/(auth)/auth/sign-in");
							await localStorage.multiRemove(["accessToken", "refreshToken"]);
							throw { response: { status: 401 } };
						}
						return Promise.reject(error);
					}
				}
			}
		);
	}

	const post = async <T = unknown, R = unknown>(
		path: string,
		body?: T,
		params?: AxiosRequestConfig<T>
	) => {
		const res = await api.post<R>(path, body, params);
		return res;
	};

	const get = async<R = unknown> (path: string, config?: AxiosRequestConfig) => {
		const res = await api.get<R>(path, config);
		return res;
	};

	return {
		post,
		get,
	};
};
