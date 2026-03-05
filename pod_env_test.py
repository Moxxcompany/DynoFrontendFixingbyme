#!/usr/bin/env python3
"""
DynoPay Next.js Environment Variable Verification Test
Tests the .env configuration and NextAuth setup for the pod URL deployment
"""

import requests
import json
import os
import sys
from datetime import datetime

class DynoPayEnvTester:
    def __init__(self):
        self.pod_url = "https://auth-env-deploy.preview.emergentagent.com"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, test_name, success, message="", details=None):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {test_name}: PASSED")
            if message:
                print(f"   {message}")
        else:
            print(f"❌ {test_name}: FAILED")
            print(f"   {message}")
        
        self.test_results.append({
            "test_name": test_name,
            "status": "PASSED" if success else "FAILED",
            "message": message,
            "details": details
        })
        return success

    def verify_env_file(self):
        """Verify .env file exists and contains all 8 required variables"""
        print("\n🔍 Verifying .env file configuration...")
        
        env_path = "/app/.env"
        required_vars = [
            "NEXT_PUBLIC_BASE_URL",
            "NEXT_PUBLIC_CYPHER_KEY", 
            "NEXT_PUBLIC_GOOGLE_CLIENT_ID",
            "NEXT_PUBLIC_GOOGLE_CLIENT_SECRET",
            "NEXT_PUBLIC_SERVER_URL",
            "NEXT_PUBLIC_TELEGRAM_BOT_TOKEN",
            "NEXTAUTH_SECRET",
            "NEXTAUTH_URL"
        ]
        
        try:
            if not os.path.exists(env_path):
                return self.log_test("ENV_FILE_EXISTS", False, f".env file not found at {env_path}")
            
            with open(env_path, 'r') as f:
                content = f.read()
            
            found_vars = {}
            for line in content.strip().split('\n'):
                if '=' in line:
                    key = line.split('=')[0].strip()
                    value = line.split('=', 1)[1].strip().strip('"')
                    found_vars[key] = value
            
            # Check if all required vars are present
            missing_vars = [var for var in required_vars if var not in found_vars]
            if missing_vars:
                return self.log_test("ENV_VARS_COMPLETE", False, f"Missing variables: {missing_vars}")
            
            self.log_test("ENV_FILE_EXISTS", True, f"Found .env file with {len(found_vars)} variables")
            self.log_test("ENV_VARS_COMPLETE", True, f"All 8 required environment variables present")
            
            # Verify specific URLs
            expected_pod_url = "https://auth-env-deploy.preview.emergentagent.com/"
            expected_base_url = "https://api.dynopay.com/"
            
            nextauth_url_correct = found_vars.get("NEXTAUTH_URL") == expected_pod_url
            server_url_correct = found_vars.get("NEXT_PUBLIC_SERVER_URL") == expected_pod_url  
            base_url_correct = found_vars.get("NEXT_PUBLIC_BASE_URL") == expected_base_url
            
            self.log_test("NEXTAUTH_URL_CORRECT", nextauth_url_correct, 
                         f"Expected: {expected_pod_url}, Found: {found_vars.get('NEXTAUTH_URL')}")
            self.log_test("SERVER_URL_CORRECT", server_url_correct,
                         f"Expected: {expected_pod_url}, Found: {found_vars.get('NEXT_PUBLIC_SERVER_URL')}")
            self.log_test("BASE_URL_CORRECT", base_url_correct,
                         f"Expected: {expected_base_url}, Found: {found_vars.get('NEXT_PUBLIC_BASE_URL')}")
            
            return True
            
        except Exception as e:
            return self.log_test("ENV_FILE_VERIFICATION", False, f"Error reading .env file: {str(e)}")

    def test_frontend_loading(self):
        """Test if frontend loads successfully at pod URL"""
        print(f"\n🔍 Testing frontend loading at {self.pod_url}...")
        
        try:
            response = requests.get(f"{self.pod_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                content_length = len(response.content)
                has_html = '<html' in response.text.lower()
                has_title = '<title>' in response.text.lower()
                
                self.log_test("FRONTEND_HTTP_STATUS", True, f"HTTP 200 OK, Content length: {content_length} bytes")
                self.log_test("FRONTEND_HTML_VALID", has_html and has_title, 
                             f"HTML structure valid: {has_html and has_title}")
            else:
                self.log_test("FRONTEND_HTTP_STATUS", False, f"HTTP {response.status_code}")
                
            return success
            
        except Exception as e:
            return self.log_test("FRONTEND_LOADING", False, f"Error loading frontend: {str(e)}")

    def test_nextauth_providers(self):
        """Test NextAuth providers endpoint"""
        print(f"\n🔍 Testing NextAuth providers endpoint...")
        
        try:
            response = requests.get(f"{self.pod_url}/api/auth/providers", timeout=10)
            
            if response.status_code != 200:
                return self.log_test("NEXTAUTH_PROVIDERS_HTTP", False, f"HTTP {response.status_code}")
            
            try:
                data = response.json()
            except:
                return self.log_test("NEXTAUTH_PROVIDERS_JSON", False, "Invalid JSON response")
            
            # Check if Google provider is configured
            has_google = 'google' in data
            if has_google:
                google_config = data['google']
                correct_callback = self.pod_url in google_config.get('callbackUrl', '')
                correct_signin = self.pod_url in google_config.get('signinUrl', '')
                
                self.log_test("NEXTAUTH_PROVIDERS_HTTP", True, f"HTTP 200 OK")
                self.log_test("NEXTAUTH_GOOGLE_PROVIDER", has_google, f"Google provider found")
                self.log_test("NEXTAUTH_GOOGLE_URLS", correct_callback and correct_signin,
                             f"Google URLs use pod URL: callback={correct_callback}, signin={correct_signin}")
            else:
                self.log_test("NEXTAUTH_GOOGLE_PROVIDER", False, f"Google provider not found in response")
            
            return True
            
        except Exception as e:
            return self.log_test("NEXTAUTH_PROVIDERS", False, f"Error testing NextAuth: {str(e)}")

    def test_nextauth_session_endpoint(self):
        """Test NextAuth session endpoint"""
        print(f"\n🔍 Testing NextAuth session endpoint...")
        
        try:
            response = requests.get(f"{self.pod_url}/api/auth/session", timeout=10)
            
            # Session endpoint should return 200 with null or session data
            success = response.status_code == 200
            
            if success:
                try:
                    data = response.json()
                    self.log_test("NEXTAUTH_SESSION_HTTP", True, f"HTTP 200 OK, Response: {data}")
                except:
                    self.log_test("NEXTAUTH_SESSION_JSON", False, "Invalid JSON response")
            else:
                self.log_test("NEXTAUTH_SESSION_HTTP", False, f"HTTP {response.status_code}")
                
            return success
            
        except Exception as e:
            return self.log_test("NEXTAUTH_SESSION", False, f"Error testing session: {str(e)}")

    def generate_report(self):
        """Generate final test report"""
        print(f"\n📊 Test Summary")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        return {
            "timestamp": datetime.now().isoformat(),
            "pod_url": self.pod_url,
            "tests_run": self.tests_run,
            "tests_passed": self.tests_passed,
            "success_rate": f"{(self.tests_passed/self.tests_run)*100:.1f}%",
            "test_results": self.test_results
        }

def main():
    tester = DynoPayEnvTester()
    
    print("🚀 Starting DynoPay Next.js Environment Verification Tests")
    print(f"Pod URL: {tester.pod_url}")
    
    # Run all tests
    tester.verify_env_file()
    tester.test_frontend_loading()
    tester.test_nextauth_providers()
    tester.test_nextauth_session_endpoint()
    
    # Generate report
    report = tester.generate_report()
    
    # Save report
    with open("/app/test_reports/pod_env_test_results.json", "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"\n📁 Test report saved to: /app/test_reports/pod_env_test_results.json")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())