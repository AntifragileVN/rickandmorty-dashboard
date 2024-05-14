import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

import c from './Modal.module.css';

const ModalRoot = document.querySelector('#modal-root');

type ModalProps = {
	children: ReactNode;
	onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'Escape') {
			console.log(e.code);
			onClose();
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	const handleBackDropClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!ModalRoot) {
		return null;
	}

	return createPortal(
		<div className={c.overlay} onClick={handleBackDropClick}>
			<div className={c.modalStyled}>{children}</div>
		</div>,
		ModalRoot,
	);
};

export default Modal;
