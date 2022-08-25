export function clickToCopy(node: {
	innerText: string;
	dispatchEvent: (arg0: CustomEvent<unknown>) => void;
	addEventListener: (arg0: string, arg1: () => Promise<void>) => void;
	removeEventListener: (arg0: string, arg1: () => Promise<void>) => void;
}) {
	async function copyText() {
		const text = node.innerText;

		try {
			await navigator.clipboard.writeText(text);

			node.dispatchEvent(
				new CustomEvent('copysuccess', {
					bubbles: true
				})
			);
		} catch (error) {
			node.dispatchEvent(
				new CustomEvent('copyerror', {
					bubbles: true,
					detail: error
				})
			);
		}
	}

	node.addEventListener('click', copyText);

	return {
		destroy() {
			node.removeEventListener('click', copyText);
		}
	};
}
