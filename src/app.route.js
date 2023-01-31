import { Routes, Route, HashRouter } from "react-router-dom";
import Accounts from "./pages/accounts/account";
import DebitCard from "./pages/accounts/debitCard";
import Statement from "./pages/accounts/statement";
import AuthWrapper from "./pages/auth/authLayout";
import CustomerLogo from "./pages/auth/customerLogo";
import ExistingCustomer from "./pages/auth/existingCustomer";
import ForceChangePassword from "./pages/auth/force-change-password";
import LoginComponent from "./pages/auth/autLogin";
import NewCustomer from "./pages/auth/new-customer/new-customer";
import SignUpComponent from "./pages/auth/signUp";
import VerifyOtpComponent from "./pages/auth/verifyOtp";
import AddBeneficiary from "./pages/beneficiary/add-beneficiay";
import Dashboard from "./pages/dashboard/dashboard";
import Deposit from "./pages/deposit/deposit";
import TermDepositCreate from "./pages/deposit/term-deposit-create";
import ExhangeRates from "./pages/exchangeRates/exchangeRates";
import Landing from "./pages/landing/landing";
import Layout from "./pages/layout/layout";
import ApplyLoan from "./pages/loans/apply-loan";
import ApplyMicroLoan from "./pages/loans/apply-micro-loan";
import Loans from "./pages/loans/loans";
import DeLinkAccount from "./pages/otherServices/deLinkAccount";
import LinkAccount from "./pages/otherServices/linkAccount";
import OtherServices from "./pages/otherServices/otherServices";
import MobilePayment from "./pages/payments/mobile";
import Payments from "./pages/payments/payments";
import Portfolio from "./pages/portfolio/portfolio";
import ProfileSetting from "./pages/profile/profile-setting";
import QuickTransfer from "./pages/quickTransfer/quick-transfer";
import Settings from "./pages/settings/settings";
import BeneficiaryTransfer from "./pages/transfers/beneficiary-transfer";
import InternalBeneTransfer from "./pages/transfers/internal-bene-transfer";
import Transfers from "./pages/transfers/transfers";

export default function Router() {
  return (
    <HashRouter>
      <>
        <Routes>
          <Route path="/">
            <Route index element={<Landing />} />
          </Route>

          <Route path="/login" element={<AuthWrapper />}>
            <Route index element={<LoginComponent />} />
          </Route>
          <Route path="/verifyOtp" element={<AuthWrapper />}>
            <Route index element={<VerifyOtpComponent />} />
          </Route>

          <Route path="/forceChangePassword" element={<AuthWrapper />}>
            <Route index element={<ForceChangePassword />} />
          </Route>

          <Route path="/signUp" element={<AuthWrapper />}>
            <Route index element={<SignUpComponent />} />
          </Route>

          <Route path="/existingCustomer" element={<AuthWrapper />}>
            <Route index element={<ExistingCustomer />} />
          </Route>
          <Route path="/newCustomer" element={<NewCustomer />} />

          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="/profileSettings" element={<Layout />}>
            <Route index element={<ProfileSetting />} />
          </Route>

          <Route path="/settings" element={<Layout />}>
            <Route index element={<Settings />} />
          </Route>

          <Route path="/accounts" element={<Layout />}>
            <Route index element={<Accounts />} />
          </Route>
          <Route path="/accounts/statements" element={<Layout />}>
            <Route index element={<Statement />} />
          </Route>

          <Route path="/accounts/debitCard" element={<Layout />}>
            <Route index element={<DebitCard />} />
          </Route>

          <Route path="/portfolio" element={<Layout />}>
            <Route index element={<Portfolio />} />
          </Route>
          <Route path="/transfers" element={<Layout />}>
            <Route index element={<Transfers />} />
          </Route>

          <Route path="/transfers/quick-transfer" element={<Layout />}>
            <Route index element={<QuickTransfer />} />
          </Route>

          <Route path="/transfers/beneficiary/internal" element={<Layout />}>
            <Route index element={<InternalBeneTransfer />} />
          </Route>

          <Route
            path="/transfers/beneficiary/add-Beneficiary"
            element={<Layout />}
          >
            <Route index element={<AddBeneficiary />} />
          </Route>

          <Route path="/transfers/beneficiaries" element={<Layout />}>
            <Route index element={<BeneficiaryTransfer />} />
          </Route>
          <Route path="/payments" element={<Layout />}>
            <Route index element={<Payments />} />
          </Route>
          <Route path="/payments/mobile" element={<Layout />}>
            <Route index element={<MobilePayment />} />
          </Route>

          <Route path="/deposit" element={<Layout />}>
            <Route index element={<Deposit />} />
          </Route>
          <Route path="/deposit/term-deposit-create" element={<Layout />}>
            <Route index element={<TermDepositCreate />} />
          </Route>
          <Route path="/loans" element={<Layout />}>
            <Route index element={<Loans />} />
          </Route>

          <Route path="/loans/applyLoan" element={<Layout />}>
            <Route index element={<ApplyLoan />} />
          </Route>

          <Route path="/loans/applyMicroLoan" element={<Layout />}>
            <Route index element={<ApplyMicroLoan />} />
          </Route>

          <Route path="/exchangeRates" element={<Layout />}>
            <Route index element={<ExhangeRates />} />
          </Route>
          <Route path="/otherServices" element={<Layout />}>
            <Route index element={<OtherServices />} />
          </Route>
          <Route path="/otherServices/linkAccount" element={<Layout />}>
            <Route index element={<LinkAccount />} />
          </Route>

          <Route path="/otherServices/deLinkAccount" element={<Layout />}>
            <Route index element={<DeLinkAccount />} />
          </Route>

          <Route path="/customerLogo" element={<AuthWrapper />}>
            <Route index element={<CustomerLogo />} />
          </Route>

        </Routes>
      </>
    </HashRouter>
  );
}
