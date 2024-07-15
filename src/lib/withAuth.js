// // src/lib/withAuth.js
// import { useSession, signIn } from 'next-auth/react';
// import { useEffect } from 'react';

// const withAuth = (WrappedComponent) => {
//   return (props) => {
//     const { data: session, status } = useSession();

//     useEffect(() => {
//       if (status === 'unauthenticated') {
//         signIn();
//       }
//     }, [status]);

//     if (status === 'loading') {
//       return <div>Loading...</div>;
//     }

//     if (status === 'authenticated') {
//       return <WrappedComponent {...props} session={session} />;
//     }

//     return null;
//   };
// };

// export default withAuth;
