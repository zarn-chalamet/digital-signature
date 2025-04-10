/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react"
import { createPortal } from "react-dom";
import useOutsideClick from "@/hooks/useOutsideClick";

const ModalContext = createContext()

const Modal = ({ children }) => {
    const [openName, setOpenName] = useState('')
    const open = setOpenName
    const close = () => setOpenName('')
    return (
        <ModalContext.Provider value={{ openName, open, close }}>
            {children}
        </ModalContext.Provider>
    )
}

const Open = ({ children, opens: openWindowName }) => {
    const { open } = useContext(ModalContext)
    return cloneElement(children, { onClick: () => open(openWindowName) })
}

const Window = ({ children, name, width = '384px' }) => {
    const { openName, close } = useContext(ModalContext)

    const modalRef = useOutsideClick(close)

    if (openName !== name) return null

    return createPortal(
        <div className="fixed z-[100] inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs animate-fadeIn">
            <div ref={modalRef} className={`w-[${width}] ${width ? 'md:w-[600px]' : ''} p-6 bg-slate-50 dark:bg-slate-900 dark:border-slate-700 border dark:text-slate-50 rounded-lg shadow-lg animate-slideUp`}>
                <div>
                    {cloneElement(children, { onCloseModal: close })}
                </div>
            </div>
        </div>,
        document.body
    )
}

Modal.Open = Open
Modal.Window = Window

export default Modal
