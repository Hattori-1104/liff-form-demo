import { cn } from "cn"
import type { ReactNode } from "react"

export function Layout({
	children,
	className,
}: {
	children: ReactNode
	className?: string
}) {
	return (
		<div
			className={cn(
				"flex min-h-svh w-full flex-col items-center bg-muted",
				className,
			)}
		>
			{/* <header className="h-12 shrink-0 w-full">test</header> */}
			{children}
		</div>
	)
}
