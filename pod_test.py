#!/usr/bin/env python3
"""
Simple DynoPay Pod Testing Suite
Tests the pod-specific endpoints and functionality
"""

import requests
import sys
import json
from datetime import datetime

class DynoPayPodTester:
    def __init__(self, pod_url="https://auth-env-deploy.preview.emergentagent.com"):
        self.pod_url = pod_url.rstrip('/')
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, test_name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            
        result = {
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {test_name}: {details}")

    def test_homepage_load(self):
        """Test homepage loads with HTTP 200"""
        try:
            response = requests.get(f"{self.pod_url}/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                # Check if it contains DynoPay content
                if "dynopay" in response.text.lower() or "DynoPay" in response.text:
                    details += ", Contains DynoPay branding"
                else:
                    details += ", WARNING: No DynoPay branding found"
            self.log_result("Homepage Load (HTTP 200)", success, details)
            return success
        except Exception as e:
            self.log_result("Homepage Load (HTTP 200)", False, f"Error: {str(e)}")
            return False

    def test_backend_health(self):
        """Test backend health endpoint"""
        try:
            response = requests.get(f"{self.pod_url}/api/health", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                try:
                    data = response.json()
                    if data.get('status') == 'ok':
                        details += ", Service OK"
                    else:
                        details += f", Response: {data}"
                except:
                    details += ", Non-JSON response"
            self.log_result("Backend Health Check (/api/)", success, details)
            return success
        except Exception as e:
            self.log_result("Backend Health Check (/api/)", False, f"Error: {str(e)}")
            return False

    def test_auth_login_page(self):
        """Test /auth/login page loads"""
        try:
            response = requests.get(f"{self.pod_url}/auth/login", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success and "login" in response.text.lower():
                details += ", Contains login content"
            self.log_result("Auth Login Page Load", success, details)
            return success
        except Exception as e:
            self.log_result("Auth Login Page Load", False, f"Error: {str(e)}")
            return False

    def test_auth_register_page(self):
        """Test /auth/register page loads"""
        try:
            response = requests.get(f"{self.pod_url}/auth/register", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success and ("register" in response.text.lower() or "sign up" in response.text.lower()):
                details += ", Contains register content"
            self.log_result("Auth Register Page Load", success, details)
            return success
        except Exception as e:
            self.log_result("Auth Register Page Load", False, f"Error: {str(e)}")
            return False

    def test_nextauth_providers(self):
        """Test NextAuth providers endpoint"""
        try:
            response = requests.get(f"{self.pod_url}/api/auth/providers", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                try:
                    data = response.json()
                    if 'google' in data:
                        details += ", Google OAuth configured"
                    details += f", Providers: {list(data.keys())}"
                except:
                    details += ", Response parsing failed"
            self.log_result("NextAuth Providers Endpoint", success, details)
            return success
        except Exception as e:
            self.log_result("NextAuth Providers Endpoint", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all pod-specific tests"""
        print("🚀 Starting DynoPay Pod Testing Suite")
        print("=" * 50)
        
        # Test homepage
        print("\n🏠 Testing Homepage...")
        self.test_homepage_load()
        
        # Test backend health
        print("\n🏥 Testing Backend Health...")
        self.test_backend_health()
        
        # Test auth pages
        print("\n🔐 Testing Auth Pages...")
        self.test_auth_login_page()
        self.test_auth_register_page()
        
        # Test NextAuth
        print("\n🔑 Testing NextAuth...")
        self.test_nextauth_providers()
        
        # Print summary
        print("\n" + "=" * 50)
        print("📊 TEST SUMMARY")
        print("=" * 50)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "0%")
        
        return self.tests_passed, self.tests_run, self.test_results

def main():
    """Main test execution"""
    try:
        tester = DynoPayPodTester()
        passed, total, results = tester.run_all_tests()
        
        # Save detailed results
        with open('/app/test_reports/pod_test_results.json', 'w') as f:
            json.dump({
                'summary': {
                    'total_tests': total,
                    'passed_tests': passed,
                    'failed_tests': total - passed,
                    'success_rate': round((passed/total*100), 1) if total > 0 else 0,
                    'test_timestamp': datetime.now().isoformat()
                },
                'detailed_results': results
            }, f, indent=2)
        
        print(f"📄 Test results saved to: /app/test_reports/pod_test_results.json")
        
        # Return appropriate exit code
        if passed == total:
            print("✅ All pod tests passed!")
            return 0
        else:
            print(f"⚠️  {total - passed} test(s) failed")
            return 1
            
    except Exception as e:
        print(f"❌ Critical error during testing: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())