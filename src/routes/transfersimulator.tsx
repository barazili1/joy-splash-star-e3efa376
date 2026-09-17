import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, PlusCircle } from "lucide-react";
import bankLogo from "@/assets/nbe-logo.png";
import iconPhone from "@/assets/phone-inactive.png";
import iconPhoneActive from "@/assets/phone-active.png";
import iconAt from "@/assets/at-inactive.png";
import iconAtActive from "@/assets/at-active.png";
import iconBank from "@/assets/bank-inactive.png";
import iconBankActive from "@/assets/bank-active.png";
import iconCard from "@/assets/card-inactive.png";
import iconCardActive from "@/assets/card-active.png";
import iconWallet from "@/assets/wallet-inactive.png";
import iconWalletActive from "@/assets/wallet-active.png";
import iconPerson from "@/assets/person.png";
import iconClipboard from "@/assets/clipboard.png";

export const Route = createFileRoute("/transfersimulator")({
  head: () => ({
    meta: [
      { title: "إرسال نقود | Instapay" },
      { name: "description", content: "إرسال النقود إلى المفضلين عبر Instapay." },
      { property: "og:title", content: "إرسال نقود | Instapay" },
      { property: "og:description", content: "إرسال النقود إلى المفضلين عبر Instapay." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TransferPage,
});

const tabs = [
  { icon: iconPhone, activeIcon: iconPhoneActive, label: "رقم الهاتف" },
  { icon: iconAt, activeIcon: iconAtActive, label: "عنوان InstaPay" },
  { icon: iconBank, activeIcon: iconBankActive, label: "حساب بنكي" },
  { icon: iconCard, activeIcon: iconCardActive, label: "بطاقة" },
  { icon: iconWallet, activeIcon: iconWalletActive, label: "رقم المحفظة" },
];

function TransferPage() {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");
    setAmount(digits ? Number(digits).toLocaleString("en-US") : "");
  };

  return (
    <div className="ts" dir="rtl" lang="ar">
      <header className="ts-hero" />

      <section className="ts-from">
        <img className="ts-from-logo" src={bankLogo} alt="البنك الأهلي المصري" />
        <div className="ts-from-info">
          <small>من</small>
          <input
            className="ts-from-name"
            type="text"
            dir="ltr"
            defaultValue="kareem.gmal7819@instapay"
            aria-label="اسم المرسل"
          />
          <span>PREPAID</span>
        </div>
        <button type="button" className="ts-from-toggle" aria-label="تغيير">
          <ChevronDown strokeWidth={2.2} />
        </button>
      </section>

      <section className="ts-card">
        <div className="ts-card-head">
          <h2>إرسال النقود إلى</h2>
          <button type="button" className="ts-fav">
            <span className="ts-fav-star" aria-hidden="true">☆</span>
            <span>المفضلين</span>
            <span className="ts-fav-chev" aria-hidden="true">‹</span>
          </button>
        </div>

        <div className="ts-tabs" role="tablist">
          {tabs.map((tab, i) => {
            const enabled = i === 0 || i === tabs.length - 1;
            return (
              <button
                key={tab.label}
                type="button"
                role="tab"
                aria-selected={activeTab === i}
                aria-label={tab.label}
                disabled={!enabled}
                className={`ts-tab${activeTab === i ? " active" : ""}${enabled ? "" : " disabled"}`}
                onClick={() => enabled && setActiveTab(i)}
              >
                <img className="tab-icon-base" src={tab.icon} alt="" />
                <img className="tab-icon-active" src={tab.activeIcon} alt="" />
              </button>
            );
          })}
        </div>

        <div className="ts-field-head">
          <h3>{tabs[activeTab]?.label}</h3>
          <span className="ts-help" aria-hidden="true">؟</span>
        </div>

        <div className="ts-input-row">
          <div className="ts-input">
            <input type="tel" placeholder="رقم الهاتف" dir="rtl" />
            <span className="ts-input-icon">
              <img src={iconClipboard} alt="" />
            </span>
          </div>
          <button type="button" className="ts-contact" aria-label="جهات الاتصال">
            <img src={iconPerson} alt="" />
          </button>
        </div>

        <div className="ts-amount">
          <input
            type="text"
            inputMode="numeric"
            placeholder="المبلغ"
            dir="rtl"
            value={amount}
            onChange={handleAmountChange}
          />
          <span className="ts-amount-sep" aria-hidden="true" />
          <span className="ts-currency">EGP</span>
        </div>
      </section>

      <div className="ts-dots" aria-hidden="true">
        <span />
        <span className="on" />
      </div>

      <button type="button" className="ts-reason">
        <PlusCircle strokeWidth={2.2} />
        <span>أضف سبب التحويل</span>
      </button>

      <button type="button" className="ts-next">التالي</button>

    </div>
  );
}
