import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";

export const API_URL = "http://localhost:8080/api/v1/";
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
		withCredentials: true,
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
				console.log(localStorage.getItem("refreshToken"));

				if (error.response.status !== 401) {
					console.log("ERRoR");
					return Promise.reject(error);
				}
				if (error.response.status === 401) {
					try {
						api.interceptors.response.eject(interceptor);
						const refreshToken = localStorage.getItem("refreshToken");
						console.error(
							"Error at API AXIOS",
							error.response.status,
							refreshToken
						);
						console.log("Attempting token refresh...");

						const url = "auth/refresh";
						const body = {
							// refreshToken: refreshToken,
						};

						const headers = {
							"Content-Type": "application/x-www-form-urlencoded",
						};

						const refreshApi = axios.create({
							baseURL: API_URL,
							headers: {
								"Content-Type": "application/json",
							},
							withCredentials: true, // This will send the refresh token cookie
						});

						const response = refreshApi.get(url);
                        console.log(response, "RESPONSE")
						if (response.data && response.data.result) {
							const newAccessToken = `Bearer ${response.data.result.token}`;

							// Update localStorage
							localStorage.setItem("accessToken", newAccessToken);

							// Update the failed request with new token
							error.config.headers["Authorization"] = newAccessToken;

							// Recreate the interceptor for future requests
							createAxiosResponseInterceptor();

							// Retry the original request
							return api(error.config);
						}

						localStorage.setItem(
							"accessToken",
							"Bearer " + (await response).data.result.token
						);
						// localStorage.setItem(
						// 	"refreshToken",
						// 	response.data.result.refreshToken
						// );
						console.log(response, "AXIOS RESPONSE");
						// error.response.config.headers[
						// 	"Authorization"
						// ] = `Bearer + ${response.data.result.token}`;
						return axios(error.response.config);

						// const response = api.get(API_URL)
					} catch (error) {
						console.log(error, "AERROR");
						//If refresh token is invalid, you will receive this error status and log user out
						if (error.response.status === 400) {
							router.replace("/auth/login");
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

	const get = async <R = unknown>(
		path: string,
		config?: AxiosRequestConfig,
        params?:AxiosRequestConfig<R>
	) => {
		const res = await api.get<R>(path, config);
		return res;
	};

	const put = async <T = unknown, R = unknown>(
		path: string,
		body?: T,
		params?: AxiosRequestConfig<T>
	) => {
		const res = await api.put<R>(path, body, params);
		return res;
	};

	return {
		post,
		get,
		put,
	};
};
