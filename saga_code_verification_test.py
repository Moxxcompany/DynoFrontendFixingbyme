#!/usr/bin/env python3
"""
Redux Saga Code Verification Test
This test verifies that the Redux Saga TypeScript files have the correct API endpoint paths
as specified in the fix requirements.
"""

import sys
import re
from datetime import datetime

class SagaCodeVerificationTest:
    def __init__(self):
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

    def verify_wallet_saga_verify_otp(self):
        """Verify WalletSaga.ts verifyOtp function uses '/wallet/verifyOtp'"""
        try:
            with open("/app/Redux/Sagas/WalletSaga.ts", 'r') as f:
                content = f.read()
            
            # Check for the correct endpoint in verifyOtp function
            if '"/wallet/verifyOtp"' in content:
                # Ensure it's NOT using the old endpoint
                if '"/wallet/verifyCode"' in content:
                    self.log_test("WalletSaga verifyOtp endpoint", False, 
                                "Still contains old '/wallet/verifyCode' endpoint")
                    return False
                else:
                    self.log_test("WalletSaga verifyOtp endpoint", True, 
                                "Uses correct '/wallet/verifyOtp' endpoint")
                    return True
            else:
                self.log_test("WalletSaga verifyOtp endpoint", False, 
                            "Does not contain '/wallet/verifyOtp' endpoint")
                return False
                
        except Exception as e:
            self.log_test("WalletSaga verifyOtp endpoint", False, f"Error reading file: {e}")
            return False

    def verify_api_saga_regenerate_key(self):
        """Verify ApiSaga.ts regenerateApi function uses 'userApi/regenerateKey/{id}'"""
        try:
            with open("/app/Redux/Sagas/ApiSaga.ts", 'r') as f:
                content = f.read()
            
            # Check for the correct endpoint pattern
            if '`userApi/regenerateKey/${id}`' in content:
                # Ensure it's NOT using the old endpoint
                if '`userApi/regenerateApi/${id}`' in content:
                    self.log_test("ApiSaga regenerateApi endpoint", False,
                                "Still contains old 'userApi/regenerateApi/{id}' endpoint")
                    return False
                else:
                    self.log_test("ApiSaga regenerateApi endpoint", True,
                                "Uses correct 'userApi/regenerateKey/{id}' endpoint")
                    return True
            else:
                self.log_test("ApiSaga regenerateApi endpoint", False,
                            "Does not contain 'userApi/regenerateKey/{id}' endpoint")
                return False
                
        except Exception as e:
            self.log_test("ApiSaga regenerateApi endpoint", False, f"Error reading file: {e}")
            return False

    def verify_wallet_saga_update_wallet(self):
        """Verify WalletSaga.ts updateWallet function uses 'wallet/address/{id}' with PUT"""
        try:
            with open("/app/Redux/Sagas/WalletSaga.ts", 'r') as f:
                content = f.read()
            
            # Check for the correct endpoint pattern with PUT method
            if '`wallet/address/${id}`' in content and 'axios.put' in content:
                # Ensure it's NOT using the old endpoint
                if '`wallet/updateWallet/${id}`' in content:
                    self.log_test("WalletSaga updateWallet endpoint", False,
                                "Still contains old 'wallet/updateWallet/{id}' endpoint")
                    return False
                else:
                    self.log_test("WalletSaga updateWallet endpoint", True,
                                "Uses correct 'wallet/address/{id}' with PUT method")
                    return True
            else:
                self.log_test("WalletSaga updateWallet endpoint", False,
                            "Does not contain correct 'wallet/address/{id}' with PUT")
                return False
                
        except Exception as e:
            self.log_test("WalletSaga updateWallet endpoint", False, f"Error reading file: {e}")
            return False

    def verify_wallet_saga_delete_wallet(self):
        """Verify WalletSaga.ts deleteWallet function uses 'wallet/wallet/delete/verify' with POST"""
        try:
            with open("/app/Redux/Sagas/WalletSaga.ts", 'r') as f:
                content = f.read()
            
            # Check for the correct endpoint with POST method and correct payload structure
            endpoint_correct = '`wallet/wallet/delete/verify`' in content
            method_correct = 'axios.post' in content  
            payload_correct = 'wallet_id: id' in content and 'otp' in content
            
            if endpoint_correct and method_correct and payload_correct:
                # Ensure it's NOT using the old endpoint
                if '`wallet/deleteWallet/${id}`' in content:
                    self.log_test("WalletSaga deleteWallet endpoint", False,
                                "Still contains old 'wallet/deleteWallet/{id}' endpoint")
                    return False
                else:
                    self.log_test("WalletSaga deleteWallet endpoint", True,
                                "Uses correct 'wallet/wallet/delete/verify' with POST and {wallet_id, otp}")
                    return True
            else:
                missing = []
                if not endpoint_correct:
                    missing.append("endpoint")
                if not method_correct:
                    missing.append("POST method") 
                if not payload_correct:
                    missing.append("payload structure")
                
                self.log_test("WalletSaga deleteWallet endpoint", False,
                            f"Missing: {', '.join(missing)}")
                return False
                
        except Exception as e:
            self.log_test("WalletSaga deleteWallet endpoint", False, f"Error reading file: {e}")
            return False

    def run_all_tests(self):
        """Run all Redux Saga code verification tests"""
        print("🔍 Starting Redux Saga Code Verification Tests...")
        print("-" * 60)
        
        # Test all 4 endpoint fixes
        test1 = self.verify_wallet_saga_verify_otp()
        test2 = self.verify_api_saga_regenerate_key()
        test3 = self.verify_wallet_saga_update_wallet()
        test4 = self.verify_wallet_saga_delete_wallet()
        
        print("-" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} tests passed")
        
        return self.tests_passed == self.tests_run

def main():
    tester = SagaCodeVerificationTest()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())