import AuthForm from '@/components/auth-form';
import Logo from '@/components/logo';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-8">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <h1 className="text-2xl font-semibold tracking-tight text-center">
          Akıllı Doküman Arama ve Özetleme Sistemine Hoş Geldiniz
        </h1>
        <p className="text-sm text-muted-foreground">
          Giriş yapmak için bilgilerinizi girin
        </p>
      </div>
      <AuthForm className="mt-8 w-full max-w-sm" />
      <p className="mt-8 text-center text-xs text-muted-foreground">
        Bu bir öğrenci projesidir. Gerçek bir authentication akışı yoktur.
      </p>
    </main>
  );
}
