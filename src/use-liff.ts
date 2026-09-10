import liff from "@line/liff"
import { useEffect, useState } from "react"

const LIFF_ID = import.meta.env.VITE_PUBLIC_LIFF_ID

if (!LIFF_ID)
	throw new Error("環境変数「VITE_PUBLIC_LIFF_ID」が設定されていません")

type LineProfile = Awaited<ReturnType<typeof liff.getProfile>>

export function useLineProfile() {
	const [profile, setProfile] = useState<LineProfile | null>(null)

	useEffect(() => {
		const initLiff = async () => {
			try {
				await liff.init({ liffId: LIFF_ID })
				if (!liff.isLoggedIn()) {
					liff.login()
					return
				}

				const _profile = await liff.getProfile()
				setProfile(_profile)
			} catch (err) {
				console.error(err)
			}
		}
		initLiff()
	}, [])

	return profile
}
