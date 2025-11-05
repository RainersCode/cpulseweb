"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const AdminDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated and is admin
    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (session?.user?.role !== 'admin') {
      router.push('/');
      return;
    }

    setIsLoading(false);
  }, [status, session?.user?.role, router]);

  if (isLoading || status === 'loading') {
    return (
      <div className="container py-5">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-dashboard">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-12">
            <h1 className="mb-3">Admin Dashboard</h1>
            <p className="text-muted">Welcome to the CoinPulse admin panel. Choose an option below to manage content.</p>
          </div>
        </div>

        <div className="row g-4">
          {/* Add Article Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100" style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div className="card-body d-flex flex-column">
                <div className="mb-3">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#ECC80B',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}
                  >
                    📝
                  </div>
                </div>
                <h5 className="card-title mb-2">Add Article</h5>
                <p className="card-text text-muted mb-4">
                  Create and publish a new cryptocurrency article or news update.
                </p>
                <Link
                  href="/admin/articles"
                  className="btn btn-primary mt-auto"
                  style={{ backgroundColor: '#ECC80B', color: '#000', border: 'none' }}
                >
                  Add Article
                </Link>
              </div>
            </div>
          </div>

          {/* Add Tweet Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100" style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div className="card-body d-flex flex-column">
                <div className="mb-3">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#1DA1F2',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}
                  >
                    🐦
                  </div>
                </div>
                <h5 className="card-title mb-2">Add Tweet</h5>
                <p className="card-text text-muted mb-4">
                  Create and publish a new tweet to the Twitter feed.
                </p>
                <Link
                  href="/admin/tweets"
                  className="btn btn-primary mt-auto"
                  style={{ backgroundColor: '#1DA1F2', color: '#fff', border: 'none' }}
                >
                  Add Tweet
                </Link>
              </div>
            </div>
          </div>

          {/* Logout Card */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100" style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <div className="card-body d-flex flex-column">
                <div className="mb-3">
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor: '#DC3545',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px'
                    }}
                  >
                    🚪
                  </div>
                </div>
                <h5 className="card-title mb-2">Logout</h5>
                <p className="card-text text-muted mb-4">
                  Sign out from the admin dashboard.
                </p>
                <button
                  onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                  className="btn btn-danger mt-auto"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
