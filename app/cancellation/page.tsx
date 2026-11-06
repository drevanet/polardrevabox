
export const metadata = {
  title: "Cancellation Policy | Reva Box",
  description:
    "Learn how to cancel your Reva Box subscription, manage automatic renewals and understand what happens to your account after cancellation.",
};

export default function Page() {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-5 py-16 text-slate-200 sm:px-8">

      {/* Header */}
      <header className="border-b border-white/10 pb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-violet-400">
          Reva Box Legal
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Cancellation Policy
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: November 6, 2026
        </p>

        <p className="mt-6 leading-8 text-slate-400">
          This Cancellation Policy explains how you can cancel your
          Reva Box subscription, when recurring payments stop, what
          happens to your subscription benefits after cancellation
          and how you can reactivate your account.
        </p>
      </header>

      <div className="space-y-12 py-10">

        {/* 1 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            1. Introduction
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box provides an online 3D packaging design platform
            that allows customers to create, customise, preview and
            download digital packaging designs.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Certain features, download allowances and subscription
            benefits require an active paid subscription.
            This policy explains how subscription cancellation works
            for purchases made through our authorised payment
            provider, Polar.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            By purchasing a subscription, you acknowledge that
            recurring billing may apply according to the selected
            plan and the terms displayed during checkout.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            2. Available Subscription Plans
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box currently offers the following subscription
            options:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-slate-400">
                Monthly
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                $10
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Billed every month
              </p>
              <p className="mt-4 text-sm text-violet-400">
                50 project downloads
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/40 bg-violet-500/[0.06] p-5">
              <p className="text-sm font-semibold text-slate-400">
                Biweekly
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                $7
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Billed every two weeks
              </p>
              <p className="mt-4 text-sm text-violet-400">
                Unlimited downloads
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-slate-400">
                Yearly
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                $98
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Billed every year
              </p>
              <p className="mt-4 text-sm text-violet-400">
                Unlimited downloads
              </p>
            </div>

          </div>

          <p className="mt-5 leading-8 text-slate-400">
            Prices are stated in US dollars unless otherwise
            indicated at checkout. Applicable taxes, if any,
            may be calculated and displayed during payment.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            3. How to Cancel Your Subscription
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            You can request cancellation of your Reva Box
            subscription through the available subscription
            management options.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-white">
            A. Subscription management portal
          </h3>

          <p className="mt-3 leading-8 text-slate-400">
            If subscription management is available through
            your account or Polar's customer portal, sign in
            using the appropriate account details, open your
            subscription management page and follow the
            cancellation instructions.
          </p>

          <h3 className="mt-6 text-lg font-semibold text-white">
            B. Contact customer support
          </h3>

          <p className="mt-3 leading-8 text-slate-400">
            If you cannot access the subscription management
            portal, contact our support team using the email
            address listed at the end of this policy.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Please provide your registered email address and
            relevant subscription or transaction reference
            so that we can identify the correct subscription.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            A cancellation request is not considered completed
            until you receive confirmation or the subscription
            management portal confirms that cancellation has
            been successfully submitted.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            4. When Does Cancellation Take Effect?
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Unless applicable law or the terms presented during
            checkout require otherwise, a successful cancellation
            stops future automatic subscription renewals.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Cancellation generally does not immediately terminate
            an already-paid subscription period. If your cancellation
            is confirmed, your paid subscription benefits may
            continue until the end of the current billing period.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            For example, if you cancel a monthly subscription
            halfway through its billing period, you may retain
            access until the current paid period ends. You should
            not be charged for another monthly period after
            cancellation has taken effect.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            The exact effective date will depend on the subscription
            status and cancellation information returned by the
            payment provider.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            5. Automatic Subscription Renewals
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Subscriptions configured for automatic renewal will
            renew at the end of their applicable billing periods
            unless cancelled before the next renewal is processed.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            The billing frequencies are:
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-400">
            <li>Monthly plan: $10 every month.</li>
            <li>Biweekly plan: $7 every two weeks.</li>
            <li>Yearly plan: $98 every year.</li>
          </ul>

          <p className="mt-4 leading-8 text-slate-400">
            Renewal dates are determined by the subscription
            billing schedule maintained by Polar. The actual
            renewal date may be displayed in your subscription
            management portal.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            We recommend cancelling sufficiently before your
            next renewal date to allow time for the cancellation
            to be processed.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            6. What Happens After Cancellation?
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Once your cancellation takes effect, your subscription
            will no longer renew automatically.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Depending on the plan and the end of your paid period:
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-400">
            <li>
              Access to paid subscription features may continue
              until the end of the paid billing period.
            </li>

            <li>
              Your account may return to the free or inactive
              subscription state after the paid period expires.
            </li>

            <li>
              Paid download allowances and unlimited download
              benefits may no longer be available.
            </li>

            <li>
              New downloads may be restricted until you purchase
              another eligible subscription.
            </li>

            <li>
              Future recurring subscription charges should stop
              once cancellation has been successfully processed.
            </li>
          </ul>

          <p className="mt-4 leading-8 text-slate-400">
            Cancellation alone does not necessarily delete your
            Reva Box account or saved projects. Data retention
            and account deletion are handled separately under
            our Privacy Policy and applicable data protection laws.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            7. Cancellation and Refunds
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Cancelling a subscription does not automatically
            result in a refund for payments already made.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Refund requests are assessed separately under our
            Refund Policy and applicable consumer protection laws.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            If you believe you have been charged incorrectly
            after successfully cancelling, contact our support
            team with your cancellation confirmation and
            transaction reference.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            8. Failed Payments and Expired Payment Methods
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            If a scheduled subscription payment cannot be
            completed, the payment provider may attempt to
            process the payment again according to its
            applicable billing and retry procedures.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            A failed payment may result in a subscription
            becoming past due, inactive, suspended or cancelled,
            depending on the payment provider's procedures and
            our subscription settings.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Paid features and download privileges may be
            restricted while a subscription payment remains
            unsuccessful.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            9. Reactivating a Cancelled Subscription
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            If you change your mind after cancelling, you may
            be able to purchase a new subscription through
            the Reva Box pricing page.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Reactivation availability depends on the current
            subscription status and the options supported
            by our payment provider.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            A new purchase may be subject to the prices,
            features and subscription terms displayed at
            the time of checkout.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            10. Cancellation by Reva Box
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            We reserve the right to suspend or terminate
            subscriptions where necessary to address fraud,
            unauthorised activity, payment abuse, security
            incidents or material violations of our Terms
            and Conditions.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Where reasonably possible and legally permitted,
            we may notify affected customers and explain
            the reason for the action.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Any refund or other remedy arising from a
            termination will be handled in accordance
            with applicable law and our Refund Policy.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            11. Changes to This Policy
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            We may update this Cancellation Policy to reflect
            changes to our subscription plans, billing
            arrangements, payment provider procedures or
            applicable legal requirements.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Updated versions will be published on this page
            with a revised last-updated date.
          </p>
        </section>

        {/* 12 */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            12. Contact Us
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            If you have questions about cancelling your
            subscription, need help accessing the subscription
            management portal or believe a cancellation has
            not been processed correctly, please contact us.
          </p>

          <div className="mt-6 space-y-3 text-slate-300">
            <p>
              <strong className="text-white">Business:</strong>{" "}
              [Your registered business name]
            </p>

            <p>
              <strong className="text-white">Support email:</strong>{" "}
              [Your support email address]
            </p>

            <p>
              <strong className="text-white">Website:</strong>{" "}
              [Your website address]
            </p>

            <p>
              <strong className="text-white">Business address:</strong>{" "}
              [Your business address]
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Reva Box. All rights reserved.
      </footer>
    </main>
  );
}
