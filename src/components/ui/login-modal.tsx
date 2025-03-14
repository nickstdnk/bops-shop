"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/context/auth-context';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick: () => void;
}

export function LoginModal({ isOpen, onClose, onRegisterClick }: LoginModalProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        setEmail('');
        setPassword('');
        onClose();
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Произошла ошибка при входе. Пожалуйста, попробуйте снова позже.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Вход в аккаунт</DialogTitle>
          <DialogDescription>
            Введите данные вашего аккаунта для входа
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@mail.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Пароль</Label>
              <Button type="button" variant="link" className="p-0 h-auto text-xs">
                Забыли пароль?
              </Button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
            {isLoading ? 'Выполняется вход...' : 'Войти'}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">Еще нет аккаунта?</p>
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-green-600"
              onClick={() => {
                onClose();
                onRegisterClick();
              }}
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
