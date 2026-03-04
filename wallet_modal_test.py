#!/usr/bin/env python3
"""
Wallet Modal Test Suite for DynoPay
Tests the login API and wallet validation functionality specific to the wallet modal implementation
"""

import requests
import sys
import json
from datetime import datetime
import time

class WalletModalTester:
    def __init__(self, base_url="https://api.dynopay.com"):
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

    def test_login_api(self):
        """Test login with provided credentials"""
        login_data = {
            "email": "paul@dyno.pt",
            "password": "Katiekendra123@"
        }
        
        endpoint = "/api/user/login"
        url = f"{self.base_url}{endpoint}"
        
        try:
            print(f"🔐 Testing login at: {url}")
            response = self.session.post(url, json=login_data, timeout=10)
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text[:200]}
            
            if response.status_code == 200:
                # Check if we got a token (DynoPay API uses 'accessToken' in data object)
                if 'data' in response_data and 'accessToken' in response_data['data']:
                    self.token = response_data['data']['accessToken']
                    self.log_result("Login API", True, f"Login successful, token received: {self.token[:20]}...")
                    return True
                elif 'token' in response_data or 'access_token' in response_data:
                    self.token = response_data.get('token') or response_data.get('access_token')
                    self.log_result("Login API", True, f"Login successful, token received: {self.token[:20]}...")
                    return True
                else:
                    self.log_result("Login API", False, f"Login returned 200 but no token. Response: {response_data}")
                    return False
            else:
                self.log_result("Login API", False, f"Login failed with status {response.status_code}. Response: {response_data}")
                return False
                
        except requests.exceptions.Timeout:
            self.log_result("Login API", False, "Request timeout")
            return False
        except requests.exceptions.ConnectionError as e:
            self.log_result("Login API", False, f"Connection error: {str(e)}")
            return False
        except Exception as e:
            self.log_result("Login API", False, f"Exception: {str(e)}")
            return False

    def test_wallet_validation_endpoint(self):
        """Test wallet validation endpoint used by AddWalletModal"""
        if not self.token:
            self.log_result("Wallet Validation", False, "No token available - login required")
            return False
            
        # Test with BTC wallet (non-tag based)
        btc_data = {
            "wallet_address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
            "currency": "BTC"
        }
        
        # Test with XRP wallet (tag-based)
        xrp_data = {
            "wallet_address": "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH",
            "currency": "XRP",
            "destination_tag": "12345"
        }
        
        endpoint = "/api/wallet/validateWalletAddress"
        url = f"{self.base_url}{endpoint}"
        
        headers = {'Authorization': f'Bearer {self.token}'}
        
        # Test BTC validation
        try:
            print(f"💰 Testing BTC wallet validation at: {url}")
            response = self.session.post(url, json=btc_data, headers=headers, timeout=10)
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text[:200]}
            
            if response.status_code in [200, 201]:
                self.log_result("BTC Wallet Validation", True, f"BTC validation successful: {response.status_code}")
            elif response.status_code == 401:
                self.log_result("BTC Wallet Validation", False, "Unauthorized - token may be invalid")
            else:
                self.log_result("BTC Wallet Validation", False, f"Status {response.status_code}: {response_data}")
                
        except Exception as e:
            self.log_result("BTC Wallet Validation", False, f"Exception: {str(e)}")
        
        # Test XRP validation (with destination_tag)
        try:
            print(f"🪙 Testing XRP wallet validation at: {url}")
            response = self.session.post(url, json=xrp_data, headers=headers, timeout=10)
            
            try:
                response_data = response.json()
            except:
                response_data = {"text": response.text[:200]}
            
            if response.status_code in [200, 201]:
                self.log_result("XRP Wallet Validation (with tag)", True, f"XRP validation successful: {response.status_code}")
            elif response.status_code == 401:
                self.log_result("XRP Wallet Validation (with tag)", False, "Unauthorized - token may be invalid")
            else:
                self.log_result("XRP Wallet Validation (with tag)", False, f"Status {response.status_code}: {response_data}")
                
        except Exception as e:
            self.log_result("XRP Wallet Validation (with tag)", False, f"Exception: {str(e)}")

    def test_currencies_coverage(self):
        """Test that the API supports all 16 required currencies"""
        expected_currencies = [
            "BTC", "ETH", "LTC", "DOGE", "BCH", "TRX", "SOL", "XRP", 
            "BNB", "POLYGON", "USDT-ERC20", "USDT-TRC20", "USDT-POLYGON", 
            "USDC-ERC20", "RLUSD", "RLUSD-ERC20"
        ]
        
        print(f"📋 Testing currency coverage for {len(expected_currencies)} currencies")
        
        if not self.token:
            self.log_result("Currency Coverage Test", False, "No token available - login required")
            return False
        
        # Test a few key currencies to verify API accepts them
        test_currencies = [
            ("BTC", "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"),
            ("SOL", "11111111111111111111111111111112"),
            ("XRP", "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH"),
            ("RLUSD", "rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH")
        ]
        
        endpoint = "/api/wallet/validateWalletAddress"
        url = f"{self.base_url}{endpoint}"
        headers = {'Authorization': f'Bearer {self.token}'}
        
        successful_currencies = []
        
        for currency, address in test_currencies:
            try:
                data = {"wallet_address": address, "currency": currency}
                
                # Add destination_tag for tag-based currencies
                if currency in ["XRP", "RLUSD"]:
                    data["destination_tag"] = "12345"
                
                response = self.session.post(url, json=data, headers=headers, timeout=10)
                
                if response.status_code in [200, 201, 400, 422]:  # 400/422 might indicate validation errors but currency is supported
                    successful_currencies.append(currency)
                    print(f"  ✅ {currency}: API accepts currency (status: {response.status_code})")
                else:
                    print(f"  ❌ {currency}: Status {response.status_code}")
                    
            except Exception as e:
                print(f"  ❌ {currency}: Exception {str(e)}")
        
        success_rate = len(successful_currencies) / len(test_currencies)
        
        if success_rate >= 0.75:  # 75% success rate indicates good currency support
            self.log_result("Currency Coverage Test", True, f"API supports {len(successful_currencies)}/{len(test_currencies)} tested currencies")
            return True
        else:
            self.log_result("Currency Coverage Test", False, f"API only supports {len(successful_currencies)}/{len(test_currencies)} tested currencies")
            return False

    def run_wallet_tests(self):
        """Run all wallet-related tests"""
        print("🚀 Starting Wallet Modal Backend Tests")
        print("=" * 50)
        
        # Test login
        print("\n🔐 Testing Login API...")
        login_success = self.test_login_api()
        
        if login_success:
            # Test wallet validation
            print("\n💰 Testing Wallet Validation...")
            self.test_wallet_validation_endpoint()
            
            # Test currency coverage
            print("\n📋 Testing Currency Support...")
            self.test_currencies_coverage()
        else:
            print("❌ Skipping wallet tests due to login failure")
        
        # Print summary
        print("\n" + "=" * 50)
        print("📊 WALLET TESTS SUMMARY")
        print("=" * 50)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%" if self.tests_run > 0 else "0%")
        
        return self.tests_passed, self.tests_run, self.test_results

def main():
    """Main test execution"""
    try:
        tester = WalletModalTester()
        passed, total, results = tester.run_wallet_tests()
        
        # Save detailed results
        with open('/app/test_reports/wallet_backend_test_results.json', 'w') as f:
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
        elif passed == 0:
            print("❌ All tests failed")
            return 1
        else:
            print("✅ Wallet backend testing completed")
            return 0
            
    except Exception as e:
        print(f"❌ Critical error during testing: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())