interface WriteViewProps {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    signIn?: (provider: string) => void;
    push?: (url: string) => void;
}
