import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './use-auth'
import axios from 'axios'

async function logoutUser(): Promise<void> {
	try {
		await axios.post(
			`${import.meta.env.VITE_API_URL}/api/auth/logout`,
			{},
			{ withCredentials: true }
		)
	} catch {
		throw new Error('Unexpected error occurred')
	}
}

export function useLogout() {
	const { setUser } = useAuth()
	const navigate = useNavigate()

	return useMutation({
		mutationFn: logoutUser,
		onSuccess: () => {
			setUser(null)
			navigate('/')
		}
	})
}
