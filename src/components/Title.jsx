
import { cn } from "../lib/utils.js";

export function Title({
	title,
	classNameDiv,
	classNameTitle,
}) {

	return (
		<div className={cn(
			'',
			classNameDiv,
		)}>
			<h1
				className={cn(
					'font-bold text-xl',
					classNameTitle,
				)}
			>
				{title}
			</h1>
		</div>
	);
}
