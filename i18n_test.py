#!/usr/bin/env python3
"""
i18n Translation Testing Script
Tests translation file completeness and structure for DynoPay app
"""

import os
import json
import sys
from typing import Dict, List, Set
from pathlib import Path

class I18nTester:
    def __init__(self):
        self.langs_dir = Path("/app/langs/locales")
        self.languages = ["en", "fr", "es", "pt"]
        self.expected_namespaces = [
            "common", "auth", "dashboardLayout", "profile", "notifications",
            "apiScreen", "walletScreen", "companyDialog", "companySettings", 
            "transactions", "createPaymentLinkScreen", "paymentLinks", 
            "helpAndSupport", "landing", "apiStatus", "termsConditions", 
            "privacyPolicy", "amlPolicy"
        ]
        self.tests_run = 0
        self.tests_passed = 0
        self.issues = []

    def run_test(self, name: str, test_func) -> bool:
        """Run a single test and track results"""
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            success = test_func()
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - {name}")
            else:
                print(f"❌ Failed - {name}")
            return success
        except Exception as e:
            print(f"❌ Failed - {name}: {str(e)}")
            self.issues.append(f"{name}: {str(e)}")
            return False

    def test_translation_files_exist(self) -> bool:
        """Test that all required translation files exist for fr and es"""
        missing_files = []
        
        for lang in ["fr", "es"]:
            lang_dir = self.langs_dir / lang
            if not lang_dir.exists():
                missing_files.append(f"Directory {lang} does not exist")
                continue
                
            for namespace in self.expected_namespaces:
                file_path = lang_dir / f"{namespace}.json"
                if not file_path.exists():
                    missing_files.append(f"{lang}/{namespace}.json")
        
        if missing_files:
            self.issues.extend([f"Missing file: {f}" for f in missing_files])
            print(f"Missing files: {missing_files}")
            return False
        
        print(f"All 18 translation files exist for French and Spanish")
        return True

    def test_json_structure_validity(self) -> bool:
        """Test that all translation files have valid JSON structure"""
        invalid_files = []
        
        for lang in ["fr", "es"]:
            lang_dir = self.langs_dir / lang
            for namespace in self.expected_namespaces:
                file_path = lang_dir / f"{namespace}.json"
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        json.load(f)
                except json.JSONDecodeError as e:
                    invalid_files.append(f"{lang}/{namespace}.json: {str(e)}")
                except Exception as e:
                    invalid_files.append(f"{lang}/{namespace}.json: {str(e)}")
        
        if invalid_files:
            self.issues.extend([f"Invalid JSON: {f}" for f in invalid_files])
            print(f"Invalid JSON files: {invalid_files}")
            return False
        
        print("All translation files have valid JSON structure")
        return True

    def test_translation_key_completeness(self) -> bool:
        """Test that fr and es have all keys that exist in en"""
        missing_keys = []
        
        for namespace in self.expected_namespaces:
            # Load English as reference
            en_file = self.langs_dir / "en" / f"{namespace}.json"
            try:
                with open(en_file, 'r', encoding='utf-8') as f:
                    en_keys = set(json.load(f).keys())
            except Exception as e:
                self.issues.append(f"Could not load en/{namespace}.json: {str(e)}")
                continue
            
            # Check fr and es have all English keys
            for lang in ["fr", "es"]:
                lang_file = self.langs_dir / lang / f"{namespace}.json"
                try:
                    with open(lang_file, 'r', encoding='utf-8') as f:
                        lang_keys = set(json.load(f).keys())
                    
                    missing_in_lang = en_keys - lang_keys
                    if missing_in_lang:
                        missing_keys.extend([f"{lang}/{namespace}.json missing: {key}" for key in missing_in_lang])
                
                except Exception as e:
                    self.issues.append(f"Could not load {lang}/{namespace}.json: {str(e)}")
        
        if missing_keys:
            self.issues.extend(missing_keys)
            print(f"Missing keys found: {len(missing_keys)} keys")
            # Show first 10 missing keys as sample
            for key in missing_keys[:10]:
                print(f"  - {key}")
            if len(missing_keys) > 10:
                print(f"  ... and {len(missing_keys) - 10} more")
            return False
        
        print("All translation keys are present in French and Spanish")
        return True

    def test_i18n_configuration(self) -> bool:
        """Test that i18n.js is properly configured"""
        i18n_file = Path("/app/i18n.js")
        if not i18n_file.exists():
            self.issues.append("i18n.js file does not exist")
            return False
        
        try:
            with open(i18n_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check that fr and es sections exist
            if 'fr: {' not in content:
                self.issues.append("French (fr) configuration missing in i18n.js")
                return False
                
            if 'es: {' not in content:
                self.issues.append("Spanish (es) configuration missing in i18n.js")
                return False
            
            # Check that all namespaces are registered for fr and es
            missing_namespaces = []
            for namespace in self.expected_namespaces:
                fr_entry = f'{namespace}: require("./langs/locales/fr/{namespace}.json")'
                es_entry = f'{namespace}: require("./langs/locales/es/{namespace}.json")'
                
                if fr_entry not in content:
                    missing_namespaces.append(f"fr:{namespace}")
                if es_entry not in content:
                    missing_namespaces.append(f"es:{namespace}")
            
            if missing_namespaces:
                self.issues.extend([f"Missing namespace in i18n.js: {ns}" for ns in missing_namespaces])
                print(f"Missing namespaces in i18n.js: {missing_namespaces}")
                return False
            
            print("i18n.js is properly configured with all namespaces")
            return True
            
        except Exception as e:
            self.issues.append(f"Error reading i18n.js: {str(e)}")
            return False

    def test_sample_translations_quality(self) -> bool:
        """Test sample translations to ensure they're not just English copies"""
        sample_checks = []
        
        # Check some key translations
        test_cases = [
            ("common", "language", {"fr": "Langue", "es": "Idioma"}),
            ("landing", "signIn", {"fr": "Se Connecter", "es": "Iniciar Sesión"}),
            ("landing", "getStarted", {"fr": "Commencer", "es": "Comenzar"}),
        ]
        
        for namespace, key, expected_translations in test_cases:
            for lang, expected_value in expected_translations.items():
                file_path = self.langs_dir / lang / f"{namespace}.json"
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    
                    if key in data:
                        actual_value = data[key]
                        if actual_value == expected_value:
                            sample_checks.append(f"✓ {lang}/{namespace}.{key}")
                        else:
                            self.issues.append(f"Translation mismatch {lang}/{namespace}.{key}: expected '{expected_value}', got '{actual_value}'")
                            sample_checks.append(f"✗ {lang}/{namespace}.{key}")
                    else:
                        self.issues.append(f"Missing key {lang}/{namespace}.{key}")
                        sample_checks.append(f"✗ {lang}/{namespace}.{key} (missing)")
                
                except Exception as e:
                    self.issues.append(f"Error checking {lang}/{namespace}.json: {str(e)}")
        
        print(f"Sample translation checks: {sample_checks}")
        return len([x for x in sample_checks if x.startswith("✗")]) == 0

    def run_all_tests(self):
        """Run all i18n tests"""
        print("🌍 Starting i18n Translation Tests")
        print("=" * 50)
        
        # Run all tests
        self.run_test("Translation files exist for fr and es", self.test_translation_files_exist)
        self.run_test("JSON structure validity", self.test_json_structure_validity)
        self.run_test("Translation key completeness", self.test_translation_key_completeness)
        self.run_test("i18n.js configuration", self.test_i18n_configuration)
        self.run_test("Sample translations quality", self.test_sample_translations_quality)
        
        # Print results
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.issues:
            print(f"\n❌ Issues found ({len(self.issues)}):")
            for issue in self.issues[:20]:  # Show first 20 issues
                print(f"  - {issue}")
            if len(self.issues) > 20:
                print(f"  ... and {len(self.issues) - 20} more issues")
        else:
            print("\n✅ All tests passed! i18n implementation looks good.")
        
        return self.tests_passed == self.tests_run

def main():
    tester = I18nTester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())