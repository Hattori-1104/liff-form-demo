import { MoveUpRightIcon } from "lucide-react"
import { useRef } from "react"
import { Avatar, AvatarImage } from "./components/ui/avatar"
import { Button } from "./components/ui/button"
import { Checkbox } from "./components/ui/checkbox"
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle,
} from "./components/ui/field"
import { Input } from "./components/ui/input"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./components/ui/select"
import { Layout } from "./layout"
import { useLineProfile } from "./use-liff"

const ENVIRONMENT = import.meta.env.VITE_PUBLIC_ENVIRONMENT ?? "development"

const OCCUPATIONS = [
	"会社員",
	"公務員",
	"自営業",
	"パート・アルバイト",
	"学生",
	"専業主婦・主夫",
	"無職",
	"その他",
]

const ACCOUNT_TYPES = [
	{ value: "futsu", label: "普通" },
	{ value: "toza", label: "当座" },
]
const ITEM_ROWS = [0, 1, 2]

export function IndexPage() {
	const formRef = useRef<HTMLFormElement>(null)

	const profile = useLineProfile({ skip: ENVIRONMENT !== "production" })

	const onSubmit = () => {
		if (!formRef.current) return
		const formData = new FormData(formRef.current)
		console.log(Object.fromEntries(formData))
	}

	return (
		<Layout className="space-y-8">
			<main className="py-8 w-full max-w-160 min-w-[256px] px-4 sm:px-8 bg-background space-y-8">
				{profile ? (
					<div className="flex gap-4 items-center">
						<Avatar size="lg">
							<AvatarImage src={profile.pictureUrl} />
						</Avatar>
						<div>
							<div>{profile.displayName}</div>
							<div className="text-muted-foreground leading-none">
								{profile.userId}
							</div>
						</div>
					</div>
				) : (
					<Button>
						LINEログインをしてください
						<MoveUpRightIcon />
					</Button>
				)}

				<form
					onSubmit={(e) => {
						e.preventDefault()
						onSubmit()
					}}
					ref={formRef}
				>
					<FieldGroup>
						<FieldSet>
							<FieldLegend>買取依頼申請フォーム</FieldLegend>
							<FieldDescription>
								買取のお申し込みに必要な情報をご入力ください。
							</FieldDescription>
						</FieldSet>

						<FieldSeparator />

						{/* 個人情報 */}
						<FieldSet>
							<FieldLegend variant="label">お客様情報</FieldLegend>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="name">名前</FieldLabel>
									<Input
										id="name"
										name="name"
										autoComplete="name"
										placeholder="山田 太郎"
										required
									/>
								</Field>

								<Field>
									<FieldLabel htmlFor="birthYear">生年月日</FieldLabel>
									<div className="flex items-center gap-2">
										<Input
											id="birthYear"
											name="birthYear"
											type="number"
											inputMode="numeric"
											min={1900}
											max={2100}
											placeholder="1990"
											className="w-24"
											required
										/>
										<span className="text-sm text-muted-foreground">年</span>
										<Input
											name="birthMonth"
											type="number"
											inputMode="numeric"
											min={1}
											max={12}
											placeholder="1"
											className="w-20"
											aria-label="生まれ月"
											required
										/>
										<span className="text-sm text-muted-foreground">月</span>
										<Input
											name="birthDay"
											type="number"
											inputMode="numeric"
											min={1}
											max={31}
											placeholder="1"
											className="w-20"
											aria-label="生まれ日"
											required
										/>
										<span className="text-sm text-muted-foreground">日</span>
									</div>
									<FieldDescription>
										18歳未満の方はご利用いただけません。
									</FieldDescription>
								</Field>

								<Field>
									<FieldLabel htmlFor="email">メールアドレス</FieldLabel>
									<Input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										placeholder="example@example.com"
										required
									/>
								</Field>

								<Field>
									<FieldLabel htmlFor="phone">携帯番号</FieldLabel>
									<Input
										id="phone"
										name="phone"
										type="tel"
										inputMode="tel"
										autoComplete="tel"
										placeholder="09011112222"
										pattern="[0-9]{10,11}"
										required
									/>
									<FieldDescription>
										ハイフンなしの半角数字でご入力ください。
									</FieldDescription>
								</Field>

								<Field>
									<FieldLabel htmlFor="occupation">ご職業</FieldLabel>
									<Select name="occupation" required>
										<SelectTrigger id="occupation" className="w-full">
											<SelectValue placeholder="選択してください" />
										</SelectTrigger>
										<SelectContent>
											{OCCUPATIONS.map((occupation) => (
												<SelectItem key={occupation} value={occupation}>
													{occupation}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</Field>
							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						{/* 買取商品 */}
						<FieldSet>
							<FieldLegend variant="label">買取商品</FieldLegend>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="itemName0">商品名・数量</FieldLabel>
									<div className="flex flex-col gap-2">
										{ITEM_ROWS.map((index) => (
											<div key={index} className="flex items-center gap-2">
												<Input
													id={index === 0 ? "itemName0" : undefined}
													name={`itemName${index}`}
													placeholder={`商品名 ${index + 1}`}
													aria-label={`商品名 ${index + 1}`}
													required={index === 0}
												/>
												<span className="text-sm text-muted-foreground">×</span>
												<Input
													name={`itemQuantity${index}`}
													type="number"
													inputMode="numeric"
													min={1}
													placeholder="1"
													className="w-24"
													aria-label={`商品 ${index + 1} の数量`}
													required={index === 0}
												/>
												<span className="text-sm text-muted-foreground">
													個
												</span>
											</div>
										))}
									</div>
									<FieldDescription>
										最大3点までご入力いただけます。
									</FieldDescription>
								</Field>

								<Field>
									<FieldLabel htmlFor="price">買取代金</FieldLabel>
									<div className="flex gap-2 items-baseline">
										<div className="shrink-0 text-muted-foreground">￥</div>
										<Input
											className="w-full shrink"
											id="price"
											name="price"
											type="number"
											inputMode="numeric"
											min={0}
											step={1}
											placeholder="10000"
											required
										/>
									</div>
									{/* <FieldDescription>
									10000円単位でご入力ください。
								</FieldDescription> */}
								</Field>
							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						{/* 住所 */}
						<FieldSet>
							<FieldLegend variant="label">ご住所</FieldLegend>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="postalCode">郵便番号</FieldLabel>
									<Input
										id="postalCode"
										name="postalCode"
										inputMode="numeric"
										autoComplete="postal-code"
										placeholder="1000001"
										pattern="[0-9]{7}"
										className="w-40"
										required
									/>
								</Field>

								<Field>
									<FieldLabel htmlFor="address">住所</FieldLabel>
									<Input
										id="address"
										name="address"
										autoComplete="street-address"
										placeholder="東京都千代田区千代田1-1"
										required
									/>
								</Field>
							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						{/* 銀行口座情報 */}
						<FieldSet>
							<FieldLegend variant="label">お振込先口座</FieldLegend>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="bankName">銀行名</FieldLabel>
									<Input
										id="bankName"
										name="bankName"
										placeholder="〇〇〇〇銀行"
										required
									/>
								</Field>

								<Field>
									<FieldLabel htmlFor="branchCode">支店番号</FieldLabel>
									<Input
										id="branchCode"
										name="branchCode"
										inputMode="numeric"
										placeholder="123"
										pattern="[0-9]{3}"
										className="w-40"
										required
									/>
									<FieldDescription>
										ゆうちょ銀行をご希望の方は店番(3ケタの数字)を入力してください。
									</FieldDescription>
								</Field>

								<Field>
									<FieldLabel htmlFor="accountType">口座種別</FieldLabel>
									<Select name="accountType" defaultValue="futsu" required>
										<SelectTrigger id="accountType" className="w-40">
											<SelectValue placeholder="選択してください" />
										</SelectTrigger>
										<SelectContent>
											{ACCOUNT_TYPES.map((accountType) => (
												<SelectItem
													key={accountType.value}
													value={accountType.value}
												>
													{accountType.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</Field>

								<Field>
									<FieldLabel htmlFor="accountNumber">口座番号</FieldLabel>
									<Input
										id="accountNumber"
										name="accountNumber"
										inputMode="numeric"
										placeholder="1234567"
										pattern="[0-9]{7,8}"
										className="w-56"
										required
									/>
								</Field>

								<Field>
									<FieldLabel htmlFor="accountHolder">口座名義</FieldLabel>
									<Input
										id="accountHolder"
										name="accountHolder"
										placeholder="ヤマダ タロウ"
										required
									/>
									<FieldDescription>
										本人名義以外の銀行口座へのお振込みはできません。必ず本人名義の銀行口座を全角カタカナでご入力ください。
									</FieldDescription>
								</Field>
							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						{/* 確認・送信 */}
						<FieldSet>
							<FieldLegend variant="label">ご確認</FieldLegend>
							<FieldGroup>
								<FieldDescription className="rounded-2xl bg-muted p-4">
									この度、運営会社は株式会社リードより株式会社アドバンスへ変更・承継されました。なお、従前のお取引内容ならびに利用規約等につきましては、変更ございません。
									<br />
									<br />
									また、株式会社リードにおいて取得・管理していたお客様とのお取引情報については、古物営業法その他関係法令に基づく保存義務に従い、お取引完了後3年間の間、株式会社アドバンスが適切に保管いたします。
								</FieldDescription>

								<FieldLabel htmlFor="agreement">
									<Field orientation="horizontal">
										<Checkbox id="agreement" name="agreement" required />
										<FieldContent>
											<FieldTitle>上記内容に同意する</FieldTitle>
											<FieldDescription>
												18歳未満の方はご利用できません。
											</FieldDescription>
										</FieldContent>
									</Field>
								</FieldLabel>
							</FieldGroup>
						</FieldSet>

						<Field orientation="responsive" className="justify-end">
							<Button type="submit">送信する</Button>
						</Field>
					</FieldGroup>
				</form>
			</main>
		</Layout>
	)
}
