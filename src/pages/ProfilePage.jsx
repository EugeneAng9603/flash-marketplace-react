import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  useEffect(() => {
    // Simulate loading user data
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      memberSince: '2023-01-15'
    };

    const mockOrders = [
      { id: 1001, date: '2024-01-20', total: 149.98, status: 'Delivered' },
      { id: 1002, date: '2024-01-15', total: 79.99, status: 'Shipped' },
      { id: 1003, date: '2024-01-10', total: 199.99, status: 'Processing' }
    ];

    setUser(mockUser);
    setOrders(mockOrders);
    setFormData(mockUser);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="container">
        <h1>My Account</h1>
        
        <div className="profile-tabs">
          <button 
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Order History
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="profile-content">
            <div className="profile-header">
              <h2>Profile Information</h2>
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  Edit Profile
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button onClick={handleSave} className="save-btn">Save Changes</button>
                  <button onClick={handleCancel} className="cancel-btn">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="profile-display">
                <div className="profile-info">
                  <div className="info-item">
                    <label>Name:</label>
                    <span>{user.firstName} {user.lastName}</span>
                  </div>
                  <div className="info-item">
                    <label>Email:</label>
                    <span>{user.email}</span>
                  </div>
                  <div className="info-item">
                    <label>Phone:</label>
                    <span>{user.phone}</span>
                  </div>
                  <div className="info-item">
                    <label>Address:</label>
                    <span>{user.address}, {user.city} {user.zipCode}</span>
                  </div>
                  <div className="info-item">
                    <label>Member Since:</label>
                    <span>{new Date(user.memberSince).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-content">
            <h2>Order History</h2>
            <div className="orders-list">
              {orders.length === 0 ? (
                <p>No orders found.</p>
              ) : (
                orders.map(order => (
                  <div key={order.id} className="order-item">
                    <div className="order-header">
                      <span className="order-id">Order #{order.id}</span>
                      <span className="order-date">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                    <div className="order-details">
                      <span className="order-total">${order.total.toFixed(2)}</span>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;