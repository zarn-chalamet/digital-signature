import Branding from '../components/auth/Branding'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {

    return (
        <div className="flex items-center justify-center min-h-screen px-4 mx-auto max-w-7xl md:px-6 lg:px-24">
            <div className="flex flex-col items-center justify-center w-full md:flex-row md:gap-16">
                {/* Left */}
                <Branding />

                {/* Right*/}
                <LoginForm />
            </div>
        </div>
    )
}