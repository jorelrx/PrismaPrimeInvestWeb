export default function Loading() {
    return (
        <div className="flex items-center p-0 m-0 justify-center h-screen bg-blue-400/60">
            <div className="flex flex-col items-center">
                <svg
                    className="animate-spin h-12 w-12 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    ></circle>
                    <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                </svg>
                <p className="text-gray-600 mt-4">Carregando...</p>
            </div>
        </div>
    );
  }
  