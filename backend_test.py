import requests
import sys
from datetime import datetime

class DynoPayAPITester:
    def __init__(self, base_url="https://b03ec8f1-84a9-44f5-a10f-734a0373618e.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_json = response.json()
                    print(f"Response: {response_json}")
                    return success, response_json
                except:
                    print(f"Response (text): {response.text[:200]}...")
                    return success, response.text
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"Response: {response.text[:200]}...")
                return False, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_homepage(self):
        """Test if homepage loads"""
        success, response = self.run_test(
            "Homepage Load",
            "GET",
            "/",
            200
        )
        return success

    def test_backend_health(self):
        """Test backend health endpoint"""
        success, response = self.run_test(
            "Backend Health Check",
            "GET",
            "/api/health",
            200
        )
        return success

    def test_nextauth_providers(self):
        """Test NextAuth providers endpoint"""
        success, response = self.run_test(
            "NextAuth Providers",
            "GET",
            "/api/auth/providers",
            200
        )
        return success, response

    def test_nextauth_csrf(self):
        """Test NextAuth CSRF token endpoint"""
        success, response = self.run_test(
            "NextAuth CSRF Token",
            "GET",
            "/api/auth/csrf",
            200
        )
        return success

    def test_login_page(self):
        """Test if login page loads"""
        success, response = self.run_test(
            "Login Page Load",
            "GET",
            "/auth/login",
            200
        )
        return success

    def test_register_page(self):
        """Test if register page loads"""
        success, response = self.run_test(
            "Register Page Load",
            "GET",
            "/auth/register",
            200
        )
        return success

def main():
    """Main test runner"""
    print("🚀 Starting DynoPay API Tests...")
    tester = DynoPayAPITester()

    # Test backend health first
    if not tester.test_backend_health():
        print("❌ Backend health check failed, stopping tests")
        return 1

    # Test homepage
    if not tester.test_homepage():
        print("❌ Homepage failed to load")

    # Test NextAuth endpoints
    providers_success, providers_data = tester.test_nextauth_providers()
    if providers_success:
        print(f"✅ NextAuth providers working: {providers_data}")
    else:
        print("❌ NextAuth providers endpoint failed")

    # Test CSRF endpoint
    if not tester.test_nextauth_csrf():
        print("❌ NextAuth CSRF endpoint failed")

    # Test login page
    if not tester.test_login_page():
        print("❌ Login page failed to load")

    # Test register page  
    if not tester.test_register_page():
        print("❌ Register page failed to load")

    # Print results
    print(f"\n📊 Backend API Tests Summary:")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    
    if tester.tests_passed == tester.tests_run:
        print("✅ All backend tests passed!")
        return 0
    else:
        print(f"❌ {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())