'use client';
import { useState, useEffect } from 'react';
import { Button } from 'ui-library';
import { Card, CardBody, CardFooter } from 'ui-library';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
export default function ResetPasswordSuccessPage() {
  const router = useRouter();
  const t = useTranslations('common');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleSubmit() {
    router.push('/auth/login');
  }

  return (
    <div
      className={`flex ${isMobile ? 'flex-col justify-end' : 'flex-col justify-center'} items-center h-screen min-h-[calc(100vh - 68px)] p-4`}
    >
      <Card
        className={`w-[500px] max-w-full p-4 ${isMobile ? 'h-[100%]' : ''}`}
        shadow='none'
      >
        <CardBody className={`grid gap-2`}>
        <div className={`flex-1 ${isMobile ? 'justify-between' : ''}`}>
            <div className="align-items: top">
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', margin: '20px auto' }}
            tabIndex={0}
            aria-label='Success logo'
          >
            <circle cx="12" cy="12" r="10" fill="none" stroke="#006FEF" strokeWidth="2" />
            <path d="M7 12l3 3 7-7" stroke="#006FEF" strokeWidth="2" fill="none" />
          </svg>
          
          <p className="text-center text-black-500 text-lg" tabIndex={0}>
            {t('password_changed')}
          </p>
          <p className="text-center text-gray-500 text-sm" tabIndex={0}>
            {t('password_change_success')}
          </p>
          </div>
          </div>
          
        </CardBody>
        
        <CardFooter className="flex justify-center">
            <Button
                className="w-full"
                color={'primary'}
                type="submit"
                onClick={handleSubmit}
                aria-label={t('proceed_to_login')}
            >
                {t('proceed_to_login')}
            </Button>
        </CardFooter>
      </Card>
      
    </div>
  );
}
