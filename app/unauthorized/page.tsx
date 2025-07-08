export default function Unauthorized() {
	return (
		<div className="flex flex-col items-center justify-center">
			<h1 className="text-3xl font-extrabold">403 - Access Denied</h1>
			<p className="text-2xl font-medium">
				You are not authorized to view this page.
			</p>
		</div>
	);
}
