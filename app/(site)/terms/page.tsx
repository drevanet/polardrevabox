
export const metadata = {
  title: "Terms and Conditions | Reva Box",
  description:
    "Read the terms and conditions governing your use of Reva Box, including subscriptions, payments, intellectual property, project downloads and account responsibilities.",
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
          Terms and Conditions
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: November 6, 2026
        </p>

        <p className="mt-6 leading-8 text-slate-400">
          Welcome to Reva Box. These Terms and Conditions govern
          your access to and use of our website, 3D packaging
          design editor, subscription plans and related services.
          Please read them carefully before using the platform.
        </p>
      </header>

      <div className="space-y-12 py-10">

        {/* 1 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            1. Acceptance of These Terms
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            By accessing or using Reva Box, creating an account,
            uploading artwork, purchasing a subscription or
            downloading a design, you agree to be bound by
            these Terms and Conditions and our associated
            policies.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            If you do not agree with these terms, you should
            not access or use the services.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            If you use Reva Box on behalf of a business or
            organisation, you confirm that you have the
            authority to accept these terms on its behalf.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            2. About Reva Box
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box is an online digital packaging design
            platform that allows users to create, customise,
            preview and download 3D box designs and packaging
            mockups.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Depending on the features available, the platform
            may allow users to:
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-400">
            <li>Create and customise six-sided 3D box designs.</li>
            <li>Upload images and artwork to individual box faces.</li>
            <li>Modify design elements, colours, text and layouts.</li>
            <li>Preview packaging designs in a 3D environment.</li>
            <li>Save and manage design projects.</li>
            <li>Download packaging previews and mockups as PNG files.</li>
            <li>Access additional features through paid subscriptions.</li>
          </ul>

          <p className="mt-4 leading-8 text-slate-400">
            We may add, modify, improve, suspend or discontinue
            features as our services develop, subject to
            applicable law and any contractual obligations
            already owed to customers.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            3. Eligibility and User Accounts
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            You must meet the minimum legal age required to
            enter into a binding agreement in your jurisdiction
            to independently purchase and use paid services.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Some users may use the service with the permission
            and supervision of a parent, guardian or other
            legally authorised person where required by law.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            When creating an account, you agree to provide
            information that is accurate to the best of your
            knowledge and to update it when necessary.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            You are responsible for maintaining the
            confidentiality of your login credentials and
            for activities carried out through your account,
            except where unauthorised activity results from
            circumstances for which you are not responsible
            under applicable law.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Please notify us promptly if you suspect that
            your account has been accessed without
            authorisation.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            4. Subscriptions and Pricing
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Certain Reva Box features require an active paid
            subscription. Our subscription options currently
            include:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-slate-400">
                Monthly Plan
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                $10
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Per month
              </p>
              <p className="mt-4 text-sm text-violet-400">
                50 project downloads
              </p>
            </div>

            <div className="rounded-2xl border border-violet-500/40 bg-violet-500/[0.06] p-5">
              <p className="text-sm font-semibold text-slate-400">
                Biweekly Plan
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                $7
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Every two weeks
              </p>
              <p className="mt-4 text-sm text-violet-400">
                Unlimited downloads
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-slate-400">
                Yearly Plan
              </p>
              <p className="mt-3 text-3xl font-black text-white">
                $98
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Per year
              </p>
              <p className="mt-4 text-sm text-violet-400">
                Unlimited downloads
              </p>
            </div>
          </div>

          <p className="mt-6 leading-8 text-slate-400">
            Prices are stated in US dollars unless otherwise
            indicated during checkout. Applicable taxes or
            additional charges may be displayed during
            payment where required.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            The subscription price, billing frequency,
            download allowance and other material purchase
            details will be presented during checkout.
            The terms displayed at the time of purchase
            apply to that transaction.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            5. Billing and Automatic Renewals
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Subscription purchases are processed through
            Polar or another payment provider expressly
            authorised by Reva Box.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Depending on the selected plan and checkout
            configuration, subscriptions may renew
            automatically at the end of each billing period.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            By purchasing a recurring subscription, you
            authorise the payment provider to charge your
            selected payment method according to the
            applicable subscription schedule.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            You are responsible for ensuring that your
            payment method remains valid and has sufficient
            funds or available credit to complete scheduled
            payments.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            We do not intentionally store complete payment
            card credentials in our application database.
            Payment information is handled by the payment
            provider under its own terms and privacy policy.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            6. Download Limits and Subscription Benefits
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Download allowances are determined by the
            subscription plan purchased.
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-400">
            <li>
              <strong className="text-slate-200">
                Monthly subscription:
              </strong>{" "}
              Allows up to 50 project downloads during the
              applicable monthly billing period.
            </li>

            <li>
              <strong className="text-slate-200">
                Biweekly subscription:
              </strong>{" "}
              Provides unlimited project downloads while
              the subscription is active.
            </li>

            <li>
              <strong className="text-slate-200">
                Yearly subscription:
              </strong>{" "}
              Provides unlimited project downloads while
              the subscription is active.
            </li>
          </ul>

          <p className="mt-4 leading-8 text-slate-400">
            Download allowances are subject to reasonable
            technical and security controls designed to
            prevent abuse, automated misuse or activities
            that could compromise the service.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            We may restrict or investigate unusual download
            activity where reasonably necessary to protect
            the platform and its users.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Any changes to subscription benefits will be
            communicated where required by applicable law
            and will not unlawfully remove benefits already
            paid for.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            7. Cancellation of Subscriptions
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            You may cancel your subscription through the
            available subscription management portal or
            by contacting our support team.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Once cancellation is successfully processed,
            future automatic renewals should stop.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Unless otherwise required by law or specified
            during checkout, access to paid features may
            continue until the end of the current paid
            subscription period.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Cancelling a subscription does not automatically
            result in a refund for payments already made.
            Refund requests are handled under our separate
            Refund Policy.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            8. Refunds and Payment Disputes
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Refund requests are considered in accordance
            with our Refund Policy and applicable consumer
            protection laws.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            You should contact our support team if you
            experience duplicate charges, incorrect billing,
            unauthorised payments or material problems
            accessing a purchased subscription.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Nothing in these terms limits your right to
            raise a legitimate payment dispute with your
            bank, card issuer or payment provider.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            9. User Content and Uploaded Artwork
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box allows users to upload images, logos,
            artwork, text and other materials for use in
            packaging designs.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            You retain ownership of the content you upload,
            subject to the rights of any third parties who
            own or control that content.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            By uploading content, you grant Reva Box a
            limited, non-exclusive, worldwide, royalty-free
            licence to host, store, reproduce, process,
            display and technically transmit that content
            only as reasonably necessary to provide,
            maintain and secure the services you request.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            This licence does not transfer ownership of
            your artwork to Reva Box. It ends when the
            relevant content is deleted or when it is no
            longer reasonably necessary to provide the
            service, subject to lawful retention and
            backup requirements.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            You represent that you own or have obtained
            all necessary permissions, licences and rights
            to upload and use the content you submit.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            10. Intellectual Property Rights
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box and its original platform elements,
            including its branding, website design, user
            interface, software, code, graphics, logos and
            underlying technology, are owned by or licensed
            to the business operating the platform.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Except where permitted by law or expressly
            authorised in writing, you may not copy,
            reproduce, distribute, modify, reverse engineer,
            sell, sublicense or commercially exploit
            Reva Box software or proprietary platform
            materials.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Subject to third-party rights and applicable
            licences, you retain the rights you hold in
            your uploaded artwork and original designs.
            Downloading a PNG mockup does not transfer
            ownership of Reva Box software or any
            third-party material incorporated into
            the platform.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            11. Acceptable Use
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            You agree to use Reva Box lawfully and
            responsibly. You must not:
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-400">
            <li>Use the platform for unlawful or fraudulent purposes.</li>
            <li>Upload content that infringes another person's intellectual property rights.</li>
            <li>Upload malicious files, malware or harmful code.</li>
            <li>Attempt to gain unauthorised access to accounts, systems or databases.</li>
            <li>Interfere with the operation, security or availability of the platform.</li>
            <li>Bypass subscription restrictions, payment checks or download limits.</li>
            <li>Use automated tools to abuse or overload the service.</li>
            <li>Resell, redistribute or exploit platform access without authorisation.</li>
            <li>Impersonate another person or misrepresent your identity.</li>
            <li>Use Reva Box in a way that violates applicable laws or regulations.</li>
          </ul>

          <p className="mt-4 leading-8 text-slate-400">
            We may investigate suspected violations and
            take reasonable action to protect our platform,
            users and business.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            12. Project Storage and Downloads
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box may provide functionality for saving
            projects and retrieving them through your account.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            While we take reasonable steps to maintain the
            availability and integrity of saved project
            information, we cannot guarantee uninterrupted
            access or permanent storage of every uploaded
            file or project.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            You are responsible for keeping copies of
            important downloaded designs and source artwork.
            We recommend maintaining independent backups
            of business-critical materials.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Downloaded PNG files are digital previews or
            mockups. They should not be treated as
            manufacturing-ready packaging specifications,
            print production files or engineering templates
            unless expressly identified as such.
          </p>
        </section>

        {/* 13 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            13. Third-Party Services
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            Reva Box relies on third-party providers to
            operate certain parts of the service. These
            may include:
          </p>

          <ul className="mt-5 list-disc space-y-3 pl-6 leading-8 text-slate-400">
            <li>
              <strong className="text-slate-200">Neon:</strong>{" "}
              Database infrastructure and storage.
            </li>

            <li>
              <strong className="text-slate-200">Vercel:</strong>{" "}
              Website hosting and application delivery.
            </li>

            <li>
              <strong className="text-slate-200">Polar:</strong>{" "}
              Checkout, payment processing and subscription management.
            </li>
          </ul>

          <p className="mt-4 leading-8 text-slate-400">
            These providers may operate under their own
            terms, privacy policies and service conditions.
            Your use of their services may also be subject
            to those conditions.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            We are not responsible for independent third-party
            services, except to the extent required by
            applicable law.
          </p>
        </section>

        {/* 14 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            14. Privacy and Personal Information
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            We collect and process personal information
            as described in our Privacy Policy.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            By using Reva Box, you acknowledge that your
            information may be processed to provide account
            services, store projects, manage subscriptions,
            process payments and maintain platform security,
            in accordance with applicable privacy laws.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Please review our Privacy Policy for details
            about data collection, storage, sharing,
            retention and your privacy rights.
          </p>
        </section>

        {/* 15 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            15. Service Availability and Modifications
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            We aim to provide a reliable and accessible
            service. However, we do not guarantee that
            Reva Box will always be available without
            interruptions, delays, errors or maintenance.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Service interruptions may occur due to
            maintenance, infrastructure failures,
            third-party outages, security incidents,
            internet connectivity problems or other
            circumstances beyond our reasonable control.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            We may temporarily restrict access to
            particular features where reasonably
            necessary for maintenance, security,
            upgrades or operational reasons.
          </p>
        </section>

        {/* 16 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            16. Disclaimers
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            To the extent permitted by applicable law,
            Reva Box is provided on an "as available"
            basis. We do not guarantee that every feature
            will meet every user's individual expectations
            or that every generated preview will be
            suitable for a particular commercial,
            manufacturing or printing purpose.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Users are responsible for reviewing their
            designs, dimensions, artwork, colours and
            downloaded files before relying on them
            for business or production purposes.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Nothing in these terms excludes warranties
            or statutory rights that cannot legally
            be excluded under applicable law.
          </p>
        </section>

        {/* 17 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            17. Limitation of Liability
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            To the maximum extent permitted by applicable
            law, Reva Box and its operators will not be
            liable for indirect, incidental, special,
            punitive or consequential losses arising
            from the use of, or inability to use,
            the platform.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            This may include loss of anticipated profits,
            business opportunities, revenue, data or
            goodwill, except where such exclusions
            are prohibited by law.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Nothing in these terms limits liability for
            fraud, fraudulent misrepresentation, death
            or personal injury caused by negligence,
            wilful misconduct or any other liability
            that cannot legally be limited or excluded.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Where a limitation of liability is permitted,
            the extent of that limitation will be
            determined under applicable law.
          </p>
        </section>

        {/* 18 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            18. Suspension and Termination
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            You may stop using Reva Box at any time.
            You may also request account deletion by
            contacting our support team, subject to
            applicable legal and operational requirements.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            We may suspend or terminate access where
            reasonably necessary to investigate fraud,
            address security risks, enforce these terms,
            comply with legal obligations or protect
            the platform and its users.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Where reasonably possible and legally
            permitted, we will provide notice and
            information about the reason for suspension
            or termination.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Termination does not remove any rights
            or obligations that accrued before
            termination. Payment and refund matters
            will be handled according to applicable
            law and our published policies.
          </p>
        </section>

        {/* 19 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            19. Changes to These Terms
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            We may update these Terms and Conditions
            to reflect changes in our services,
            subscription plans, business operations,
            technology or legal requirements.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            The updated version will be published
            on this page with a revised last-updated
            date. Where required by law, we will
            provide notice or seek your agreement
            before material changes take effect.
          </p>
        </section>

        {/* 20 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            20. Governing Law and Disputes
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            These Terms and Conditions are subject
            to the laws of [Insert the country and
            jurisdiction governing your business],
            without limiting any mandatory consumer
            protection rights that apply in your
            country of residence.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            If a dispute arises, we encourage you
            to contact us first so that we can
            attempt to resolve the issue informally.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Where a dispute cannot be resolved
            informally, it may be referred to the
            courts or other dispute resolution
            mechanisms with appropriate jurisdiction,
            subject to applicable law.
          </p>
        </section>

        {/* 21 */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            21. General Provisions
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            If any provision of these terms is
            found to be invalid or unenforceable,
            the remaining provisions will continue
            to apply to the extent permitted by law.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            Our failure to enforce a provision
            immediately does not mean that we
            waive our right to enforce it later.
          </p>

          <p className="mt-4 leading-8 text-slate-400">
            These terms, together with the policies
            referenced in them, form the agreement
            governing your use of Reva Box, subject
            to any additional terms expressly
            agreed between you and us.
          </p>
        </section>

        {/* 22 */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">
            22. Contact Information
          </h2>

          <p className="mt-4 leading-8 text-slate-400">
            If you have questions about these Terms
            and Conditions, your subscription,
            account or use of Reva Box, please
            contact us using the details below.
          </p>

          <div className="mt-6 space-y-3 text-slate-300">
            <p>
              <strong className="text-white">
                Business:
              </strong>{" "}
              [Your registered business name]
            </p>

            <p>
              <strong className="text-white">
                Support email:
              </strong>{" "}
              [Your support email address]
            </p>

            <p>
              <strong className="text-white">
                Website:
              </strong>{" "}
              [Your website address]
            </p>

            <p>
              <strong className="text-white">
                Business address:
              </strong>{" "}
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
