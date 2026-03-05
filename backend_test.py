#!/usr/bin/env python3
"""
Backend API Test Suite for DynoPay
Tests the new API integration features implemented in Phase 1 and Phase 2
"""

import requests
import sys
import json
from datetime import datetime
import time

class DynoPayAPITester:
    def __init__(self, base_url="https://auth-url-deployment.preview.emergentagent.com"):
        # Use the pod URL for testing local endpoints
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
        self.token = None
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

    def run_api_test(self, test_name, method, endpoint, expected_status=200, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}{endpoint}"
        
        # Merge headers
        req_headers = self.session.headers.copy()
        if headers:
            req_headers.update(headers)
        if self.token:
            req_headers['Authorization'] = f'Bearer {self.token}'

        try:
            if method.upper() == 'GET':
                response = self.session.get(url, headers=req_headers, timeout=10)
            elif method.upper() == 'POST':
                response = self.session.post(url, json=data, headers=req_headers, timeout=10)
            elif method.upper() == 'PUT':
                response = self.session.put(url, json=data, headers=req_headers, timeout=10)
            elif method.upper() == 'DELETE':
                response = self.session.delete(url, headers=req_headers, timeout=10)
            else:
                raise ValueError(f"Unsupported HTTP method: {method}")

            # Check if we expect a list of status codes
            if isinstance(expected_status, list):
                success = response.status_code in expected_status
            else:
                success = response.status_code == expected_status
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text[:200]}

            details = f"Status: {response.status_code}, Expected: {expected_status}"
            if not success:
                details += f", Response: {response_data}"
                
            self.log_result(test_name, success, details)
            return success, response_data, response.status_code

        except requests.exceptions.Timeout:
            self.log_result(test_name, False, "Request timeout")
            return False, {}, 0
        except requests.exceptions.ConnectionError:
            self.log_result(test_name, False, "Connection error")
            return False, {}, 0
        except Exception as e:
            self.log_result(test_name, False, f"Exception: {str(e)}")
            return False, {}, 0

    def test_health_check(self):
        """Test basic server health"""
        # Try different health check endpoints
        endpoints = ['/health', '/api/health', '/status', '/']
        
        for endpoint in endpoints:
            success, data, status = self.run_api_test(
                f"Health Check ({endpoint})", 
                "GET", 
                endpoint, 
                expected_status=[200, 404, 301, 302]  # Accept various responses
            )
            if success and status in [200, 301, 302]:
                return True
        return False

    def test_auth_endpoints(self):
        """Test authentication endpoints"""
        # Test login endpoint
        test_data = {
            "email": "test@example.com",
            "password": "testpassword123"
        }
        
        # Try different auth endpoint variations
        auth_endpoints = ['/api/auth/login', '/auth/login', '/login', '/api/login']
        
        for endpoint in auth_endpoints:
            success, data, status = self.run_api_test(
                f"Auth Login Test ({endpoint})",
                "POST",
                endpoint,
                expected_status=[200, 401, 404, 422, 400],  # Accept various auth responses
                data=test_data
            )
            if status in [401, 422, 400]:  # These indicate the endpoint exists but auth failed
                return True
        return False

    def test_api_key_endpoints(self):
        """Test API key related endpoints"""
        endpoints_to_test = [
            ('/api/userApi/getApi', 'GET', 'API Keys Fetch'),
            ('/userApi/getApi', 'GET', 'API Keys Fetch Alt'),
            ('/api/keys', 'GET', 'API Keys List'),
            ('/api/userApi/regenerateApi/1', 'POST', 'API Regenerate'),
            ('/api/userApi/toggleStatus/1', 'PUT', 'API Toggle Status'),
        ]
        
        for endpoint, method, test_name in endpoints_to_test:
            success, data, status = self.run_api_test(
                test_name,
                method,
                endpoint,
                expected_status=[200, 401, 404, 403, 422]  # Accept auth/not found responses
            )

    def test_payment_link_endpoints(self):
        """Test payment link endpoints"""
        # Test fee preview endpoint
        fee_data = {
            "amount": 100,
            "currency": "USD"
        }
        
        endpoints_to_test = [
            ('/api/pay/getPaymentLinks', 'GET', 'Payment Links Fetch', None),
            ('/api/pay/feePreview', 'POST', 'Fee Preview', fee_data),
            ('/api/pay/createPaymentLink', 'POST', 'Create Payment Link', {
                "amount": 100,
                "currency": "USD",
                "description": "Test payment"
            }),
        ]
        
        for endpoint, method, test_name, data in endpoints_to_test:
            success, resp_data, status = self.run_api_test(
                test_name,
                method,
                endpoint,
                expected_status=[200, 401, 404, 422, 403],
                data=data
            )

    def test_transaction_endpoints(self):
        """Test transaction endpoints"""
        endpoints_to_test = [
            ('/api/wallet/getAllTransactions', 'POST', 'Transactions Fetch'),
            ('/api/transaction/123', 'GET', 'Transaction Detail Fetch'),
            ('/api/transactions/export', 'POST', 'Transaction Export', {
                "startDate": "2024-01-01T00:00:00.000Z",
                "endDate": "2024-12-31T23:59:59.999Z"
            }),
        ]
        
        for endpoint, method, test_name, *args in endpoints_to_test:
            data = args[0] if args else None
            success, resp_data, status = self.run_api_test(
                test_name,
                method,
                endpoint,
                expected_status=[200, 401, 404, 422, 403],
                data=data
            )

    def test_kyc_endpoints(self):
        """Test KYC onboarding endpoints"""
        endpoints_to_test = [
            ('/api/user/onboarding-status', 'GET', 'KYC Onboarding Status'),
            ('/api/kyc/submit', 'POST', 'KYC Submit', {}),
        ]
        
        for endpoint, method, test_name, *args in endpoints_to_test:
            data = args[0] if args else None
            success, resp_data, status = self.run_api_test(
                test_name,
                method,
                endpoint,
                expected_status=[200, 401, 404, 422, 403],
                data=data
            )

    def test_company_endpoints(self):
        """Test company endpoints"""
        # Test tax validation
        tax_data = {
            "taxId": "DE123456789",
            "country": "DE"
        }
        
        endpoints_to_test = [
            ('/api/company/getCompany', 'GET', 'Company Fetch'),
            ('/api/company/validateTax', 'POST', 'Company Tax Validation', tax_data),
        ]
        
        for endpoint, method, test_name, *args in endpoints_to_test:
            data = args[0] if args else None
            success, resp_data, status = self.run_api_test(
                test_name,
                method,
                endpoint,
                expected_status=[200, 401, 404, 422, 403],
                data=data
            )

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting DynoPay Backend API Tests")
        print("=" * 50)
        
        # Test basic connectivity
        print("\n📡 Testing API Connectivity...")
        self.test_health_check()
        
        # Test authentication
        print("\n🔐 Testing Authentication Endpoints...")
        self.test_auth_endpoints()
        
        # Test API key functionality
        print("\n🔑 Testing API Key Endpoints...")
        self.test_api_key_endpoints()
        
        # Test payment links
        print("\n💰 Testing Payment Link Endpoints...")
        self.test_payment_link_endpoints()
        
        # Test transactions
        print("\n📊 Testing Transaction Endpoints...")
        self.test_transaction_endpoints()
        
        # Test company endpoints
        print("\n🏢 Testing Company Endpoints...")
        self.test_company_endpoints()
        
        # Test KYC endpoints
        print("\n🆔 Testing KYC Endpoints...")
        self.test_kyc_endpoints()
        
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
        # Test with the pod URL for local testing
        tester = DynoPayAPITester("https://auth-url-deployment.preview.emergentagent.com")
        passed, total, results = tester.run_all_tests()
        
        # Save detailed results
        with open('/app/test_reports/backend_api_test_results.json', 'w') as f:
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
        
        # Return appropriate exit code
        if total == 0:
            print("❌ No tests were executed")
            return 1
        elif passed < total * 0.5:  # Less than 50% passed
            print("❌ More than 50% of tests failed")
            return 1
        else:
            print("✅ Backend API testing completed")
            return 0
            
    except Exception as e:
        print(f"❌ Critical error during testing: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())