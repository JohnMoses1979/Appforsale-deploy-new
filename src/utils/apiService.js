const API_BASE_URL = (process.env.EXPO_PUBLIC_API_URL || "http://65.1.250.114:8080").replace(/\/$/, "");
const BASE_URL = `${API_BASE_URL}/api`;

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function signUpApi({ fullName, email, mobile, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST', headers,
      body: JSON.stringify({ fullName, email, mobile, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Sign up failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
    throw error;
  }
}

export async function signInApi({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/auth/signin`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Sign in failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check your BASE_URL and backend.');
    throw error;
  }
}

export async function forgotPasswordApi(email) {
  try {
    const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: 'POST', headers,
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok || !data.success)
      throw new Error(data.message || 'Failed to send reset link');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function resetPasswordApi(email, newPassword) {
  try {
    const response = await fetch(`${BASE_URL}/auth/reset-password`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, newPassword }),
    });
    const data = await response.json();
    if (!response.ok || !data.success)
      throw new Error(data.message || 'Failed to reset password');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function getProfileApi(userId) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, { headers });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to get profile');
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateProfileApi(userId, profileData) {
  try {
    const response = await fetch(`${BASE_URL}/profile/${userId}`, {
      method: 'PUT', headers,
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Profile update failed');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server.');
    throw error;
  }
}

async function uploadImagesAndGetUrls(images) {
  if (!images || images.length === 0) return [];
  const formData = new FormData();
  for (let index = 0; index < images.length; index++) {
    const img = images[index];
    const filename = `image_${index}_${Date.now()}.jpg`;
    const uri = img.uri;
    if (typeof uri === 'string' && uri.startsWith('blob:')) {
      const res = await fetch(uri);
      const blob = await res.blob();
      formData.append('files', blob, filename);
    } else if (typeof uri === 'string' && uri.startsWith('data:')) {
      const res = await fetch(uri);
      const blob = await res.blob();
      formData.append('files', blob, filename);
    } else {
      formData.append('files', { uri, type: 'image/jpeg', name: filename });
    }
  }
  const response = await fetch(`${BASE_URL}/apps/upload-images`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Image upload failed (${response.status})`);
  }
  const data = await response.json();
  return data.urls || [];
}

export async function uploadAppApi(appData) {
  try {
    const imageUrls = await uploadImagesAndGetUrls(appData.images);
    const payload = {
      title: appData.title, description: appData.description,
      category: appData.category, price: parseFloat(appData.price),
      ownerName: appData.ownerName, ownerEmail: appData.ownerEmail,
      ownerPhone: appData.ownerPhone, company: appData.company,
      features: appData.features, imageUrls,
      imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
    };
    const response = await fetch(`${BASE_URL}/apps/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Upload failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function uploadAppDirectApi(appData) {
  try {
    const imageUrls = await uploadImagesAndGetUrls(appData.images);
    const payload = {
      title: appData.title, description: appData.description,
      category: appData.category, price: parseFloat(appData.price),
      ownerName: appData.ownerName, ownerEmail: appData.ownerEmail,
      ownerPhone: appData.ownerPhone, company: appData.company,
      features: appData.features, imageUrls,
      imageUrl: imageUrls.length > 0 ? imageUrls[0] : null,
    };
    const uploadResponse = await fetch(`${BASE_URL}/apps/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const uploadData = await uploadResponse.json();
    if (!uploadResponse.ok) throw new Error(uploadData.message || 'Upload failed');
    const appId = uploadData.id || uploadData.appId || uploadData._id;
    if (appId) {
      await fetch(`${BASE_URL}/apps/${appId}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      });
    }
    return uploadData;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function fetchAppsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps`);
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchAppsApi error', error);
    return [];
  }
}

export async function fetchPendingAppsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps/pending`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchPendingAppsApi error', error);
    return [];
  }
}

export async function fetchAppStatsApi() {
  try {
    const response = await fetch(`${BASE_URL}/apps/stats`);
    if (!response.ok) return { pending: 0, approved: 0, rejected: 0 };
    const data = await response.json();
    return {
      pending:  Number(data.pending)  || 0,
      approved: Number(data.approved) || 0,
      rejected: Number(data.rejected) || 0,
    };
  } catch (error) {
    console.log('fetchAppStatsApi error', error);
    return { pending: 0, approved: 0, rejected: 0 };
  }
}

export async function approveAppApi(appId) {
  const response = await fetch(`${BASE_URL}/apps/${appId}/approve`, { method: 'PUT', headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Approve failed');
  return data;
}

export async function rejectAppApi(appId) {
  const response = await fetch(`${BASE_URL}/apps/${appId}/reject`, { method: 'PUT', headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Reject failed');
  return data;
}

export async function fetchAdminNotificationsApi() {
  try {
    const response = await fetch(`${BASE_URL}/notifications/ADMIN`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchAdminNotificationsApi error', error);
    return [];
  }
}

export async function fetchAdminUnreadCountApi() {
  try {
    const response = await fetch(`${BASE_URL}/notifications/ADMIN/unread-count`);
    if (!response.ok) return 0;
    const data = await response.json();
    return Number(data.count) || 0;
  } catch (error) {
    return 0;
  }
}

export async function markAdminNotificationsReadApi() {
  try {
    await fetch(`${BASE_URL}/notifications/ADMIN/mark-read`, { method: 'PUT', headers });
  } catch (error) {
    console.log('markAdminNotificationsReadApi error', error);
  }
}

export async function fetchUserNotificationsApi(email) {
  try {
    const url = email
      ? `${BASE_URL}/notifications/USER?email=${encodeURIComponent(email)}`
      : `${BASE_URL}/notifications/USER`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.log('fetchUserNotificationsApi error', error);
    return [];
  }
}

export async function fetchUserUnreadCountApi(email) {
  try {
    const url = email
      ? `${BASE_URL}/notifications/USER/unread-count?email=${encodeURIComponent(email)}`
      : `${BASE_URL}/notifications/USER/unread-count`;
    const response = await fetch(url);
    if (!response.ok) return 0;
    const data = await response.json();
    return Number(data.count) || 0;
  } catch (error) {
    return 0;
  }
}

export async function markUserNotificationsReadApi(email) {
  try {
    const url = email
      ? `${BASE_URL}/notifications/USER/mark-read?email=${encodeURIComponent(email)}`
      : `${BASE_URL}/notifications/USER/mark-read`;
    await fetch(url, { method: 'PUT', headers });
  } catch (error) {
    console.log('markUserNotificationsReadApi error', error);
  }
}

export async function submitContactApi({ name, email, mobile, subject, message }) {
  try {
    const response = await fetch(`${BASE_URL}/contact/submit`, {
      method: 'POST', headers,
      body: JSON.stringify({ name, email, mobile, subject, message }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Failed to submit inquiry');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check your network and backend.');
    throw error;
  }
}

export async function setupAdminApi({ email, password, companyName }) {
  try {
    const response = await fetch(`${BASE_URL}/admin/setup`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password, companyName }),
    });
    const data = await response.json();
    if (response.status === 400 && data.alreadyExists) {
      return { alreadyExists: true, success: true };
    }
    if (!response.ok) throw new Error(data.message || 'Admin setup failed');
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL');
    throw error;
  }
}

export async function updateAdminApi({ oldEmail, email, password, companyName }) {
  try {
    const body = { oldEmail, email, password, companyName };
    const response = await fetch(`${BASE_URL}/admin/update`, {
      method: 'PUT', headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.message || `Update failed (${response.status})`);
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server. Check BASE_URL and backend is running.');
    throw error;
  }
}

export async function adminLoginApi({ email, password }) {
  try {
    const response = await fetch(`${BASE_URL}/admin/login`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      const err = new Error(data.message || 'Admin login failed');
      err.fieldErrors = data.errors || {};
      throw err;
    }
    return data;
  } catch (error) {
    if (error.message === 'Network request failed')
      throw new Error('Cannot connect to server.');
    throw error;
  }
}

export async function fetchAdminExistsApi() {
  try {
    const response = await fetch(`${BASE_URL}/admin/count`);
    const data = await response.json();
    return Number(data?.count ?? 0);
  } catch (error) {
    console.log('fetchAdminExistsApi error:', error);
    return 0;
  }
}
