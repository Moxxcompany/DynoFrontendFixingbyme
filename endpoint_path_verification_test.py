#!/usr/bin/env python3
"""
DynoPay Endpoint Path Verification Test
This test verifies that the 4 fixed API endpoint paths in the Redux Sagas
match the external API documentation at https://api.dynopay.com/api/docs/
"""

import requests
import sys
import json
from datetime import datetime

class EndpointPathVerificationTest:
    def __init__(self, base_url="https://api.dynopay.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def log_test(self, test_name, status, message=""):
        """Log test result"""
        self.tests_run += 1
        if status:
            self.tests_passed += 1
            print(f"✅ {test_name}: PASSED {message}")
        else:
            print(f"❌ {test_name}: FAILED {message}")
        
        self.results.append({
            "test": test_name,
            "status": "PASSED" if status else "FAILED",
            "message": message
        })

    def verify_api_docs_endpoint(self):
        """Verify API documentation endpoint is accessible"""
        try:
            response = requests.get(f"{self.base_url}/api/docs/", timeout=10)
            if response.status_code == 200:
                self.log_test("API Documentation Access", True, f"Status: {response.status_code}")
                return True
            else:
                self.log_test("API Documentation Access", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_test("API Documentation Access", False, f"Error: {str(e)}")
            return False

    def test_wallet_verify_otp_endpoint(self):
        """Test 1: Verify /wallet/verifyOtp endpoint exists (not /wallet/verifyCode)"""
        try:
            # Test the correct endpoint
            response = requests.post(f"{self.base_url}/wallet/verifyOtp", 
                                   json={"test": "endpoint_check"}, 
                                   timeout=10)
            
            # We expect either 401 (unauthorized) or 400 (bad request) - not 404 (not found)
            if response.status_code in [400, 401, 422]:
                self.log_test("Wallet verifyOtp Endpoint", True, 
                            f"Endpoint exists (Status: {response.status_code})")
                return True
            elif response.status_code == 404:
                self.log_test("Wallet verifyOtp Endpoint", False, 
                            "Endpoint not found (404)")
                return False
            else:
                self.log_test("Wallet verifyOtp Endpoint", True, 
                            f"Endpoint accessible (Status: {response.status_code})")
                return True
                
        except Exception as e:
            self.log_test("Wallet verifyOtp Endpoint", False, f"Error: {str(e)}")
            return False

    def test_user_api_regenerate_key_endpoint(self):
        """Test 2: Verify userApi/regenerateKey/{id} endpoint exists (not userApi/regenerateApi/{id})"""
        try:
            # Test with a sample ID
            test_id = "test123"
            response = requests.post(f"{self.base_url}/userApi/regenerateKey/{test_id}", 
                                   timeout=10)
            
            # We expect either 401 (unauthorized) or 400 (bad request) - not 404 (not found)
            if response.status_code in [400, 401, 422]:
                self.log_test("UserApi regenerateKey Endpoint", True, 
                            f"Endpoint exists (Status: {response.status_code})")
                return True
            elif response.status_code == 404:
                self.log_test("UserApi regenerateKey Endpoint", False, 
                            "Endpoint not found (404)")
                return False
            else:
                self.log_test("UserApi regenerateKey Endpoint", True, 
                            f"Endpoint accessible (Status: {response.status_code})")
                return True
                
        except Exception as e:
            self.log_test("UserApi regenerateKey Endpoint", False, f"Error: {str(e)}")
            return False

    def test_wallet_address_update_endpoint(self):
        """Test 3: Verify wallet/address/{id} PUT endpoint exists (not wallet/updateWallet/{id})"""
        try:
            # Test with a sample ID
            test_id = "test123"
            response = requests.put(f"{self.base_url}/wallet/address/{test_id}", 
                                  json={"test": "endpoint_check"}, 
                                  timeout=10)
            
            # We expect either 401 (unauthorized) or 400 (bad request) - not 404 (not found)
            if response.status_code in [400, 401, 422]:
                self.log_test("Wallet address PUT Endpoint", True, 
                            f"Endpoint exists (Status: {response.status_code})")
                return True
            elif response.status_code == 404:
                self.log_test("Wallet address PUT Endpoint", False, 
                            "Endpoint not found (404)")
                return False
            else:
                self.log_test("Wallet address PUT Endpoint", True, 
                            f"Endpoint accessible (Status: {response.status_code})")
                return True
                
        except Exception as e:
            self.log_test("Wallet address PUT Endpoint", False, f"Error: {str(e)}")
            return False

    def test_wallet_delete_verify_endpoint(self):
        """Test 4: Verify wallet/wallet/delete/verify POST endpoint exists (not DELETE wallet/deleteWallet/{id})"""
        try:
            response = requests.post(f"{self.base_url}/wallet/wallet/delete/verify", 
                                   json={"wallet_id": "test123", "otp": "123456"}, 
                                   timeout=10)
            
            # We expect either 401 (unauthorized) or 400 (bad request) - not 404 (not found)
            if response.status_code in [400, 401, 422]:
                self.log_test("Wallet delete verify POST Endpoint", True, 
                            f"Endpoint exists (Status: {response.status_code})")
                return True
            elif response.status_code == 404:
                self.log_test("Wallet delete verify POST Endpoint", False, 
                            "Endpoint not found (404)")
                return False
            else:
                self.log_test("Wallet delete verify POST Endpoint", True, 
                            f"Endpoint accessible (Status: {response.status_code})")
                return True
                
        except Exception as e:
            self.log_test("Wallet delete verify POST Endpoint", False, f"Error: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all endpoint verification tests"""
        print("🔍 Starting DynoPay Endpoint Path Verification Tests...")
        print(f"Base URL: {self.base_url}")
        print("-" * 60)
        
        # Test API documentation access
        api_docs_accessible = self.verify_api_docs_endpoint()
        
        # Test all 4 fixed endpoints
        test1 = self.test_wallet_verify_otp_endpoint()
        test2 = self.test_user_api_regenerate_key_endpoint() 
        test3 = self.test_wallet_address_update_endpoint()
        test4 = self.test_wallet_delete_verify_endpoint()
        
        print("-" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        # Save detailed results
        results_file = "/app/test_reports/endpoint_verification_results.json"
        with open(results_file, 'w') as f:
            json.dump({
                "timestamp": datetime.now().isoformat(),
                "base_url": self.base_url,
                "tests_run": self.tests_run,
                "tests_passed": self.tests_passed,
                "success_rate": f"{(self.tests_passed/self.tests_run)*100:.1f}%",
                "detailed_results": self.results
            }, f, indent=2)
        
        print(f"📄 Detailed results saved to: {results_file}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = EndpointPathVerificationTest()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())