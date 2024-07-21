import { TooltipProvider } from "@/components/ui/tooltip"
import ModalProvider from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import NextTopLoader from 'nextjs-toploader';

const Providers = ({
    children
} : {
    children: React.ReactNode
}) => {
  return (
    <TooltipProvider>
        <ModalProvider />
        <ToastProvider />
        <NextTopLoader showSpinner={false} height={2} color="#ff5811"/>
        {children}
    </TooltipProvider>
  )
}

export default Providers