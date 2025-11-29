# Static Website Hosting on AWS

## 🚀 Overview

This repository contains the source code for a pure static website, hosted securely on Amazon Web Services (AWS) using a highly scalable and resilient architecture.

The site is built using **HTML, CSS, and pure JavaScript** for fast, efficient, and cost-effective content delivery.

## 🏗️ Architecture and Hosting

The live website is deployed using a standard, secure AWS stack, ensuring high availability, global caching, and mandated HTTPS traffic.

| Component | Purpose | Function in this Project | 
 | ----- | ----- | ----- | 
| **AWS Region** | Physical Location | **ca-central-1** (Central Canada) | 
| **Amazon S3** | Object Storage (Origin) | Stores all static website assets (HTML, CSS, JS). The bucket is configured to be **private**. | 
| **AWS CloudFront** | Content Delivery Network (CDN) | Serves the content globally with low latency, caches assets at Edge Locations, and enforces HTTPS. | 
| **AWS Certificate Manager (ACM)** | SSL/TLS | Provides the necessary certificate for encrypted traffic (HTTPS) on the custom domain. | 
| **Amazon Route 53** | Domain Name Service (DNS) | Directs traffic from the custom domain (`yourdomain.com`) to the CloudFront distribution via an Alias Record. | 
| **Bucket Policies/OAC** | Security | The S3 bucket policy is configured to only allow access from the CloudFront distribution, preventing direct public access and securing the origin. | 

## 🗺️ Architecture Diagram

This diagram illustrates the secure data flow and the AWS services utilized in the current deployment.
<img width="1304" height="636" alt="image" src="https://github.com/user-attachments/assets/3ac9c138-c6f1-45c1-b3d2-d581c5223159" />


## ⚙️ Deployment & Provisioning Steps

This section documents the high-level steps followed to provision and configure the infrastructure using the AWS console.


### DNS and Certificate Setup

1. **Route 53 Hosted Zone:** Created a public Hosted Zone for `yourdomain.com`.

2. **Nameserver Delegation:** **(Automatic)** As the domain is registered with Route 53, the nameservers were automatically configured by AWS to use the Hosted Zone.

3. **ACM Certificate:** Requested an SSL/TLS certificate for `yourdomain.com` and `*yourdomain.com` in the `us-east-1` region (required for CloudFront as it is a global service).

4. **DNS Validation:** Created CNAME records in Route 53 to validate the ACM certificate.

### S3 Storage and CloudFront Configuration

1. **S3 Bucket Creation:** Created the primary bucket named `yourdomain.com`.

2. **S3 Security:** Ensured **Block Public Access** is **ENABLED** on the S3 bucket for security.

3. **CloudFront Distribution:** Created a new CloudFront distribution.

4. **Origin Access Control (OAC):** Configured a new OAC to securely connect CloudFront to the private S3 bucket. The OAC was used to automatically update the S3 Bucket Policy, granting read-only access exclusively to the distribution.

5. **Distribution Settings:** Configured the distribution to redirect HTTP to HTTPS, used the ACM certificate, and set the Default Root Object to `index.html`.

6. **Route 53 Alias Record:** Created an **A Record** in the Route 53 Hosted Zone to alias `yourdomain.com` directly to the new CloudFront Distribution Domain Name.

</details>

## 🛠️ Local Development

This section documents the steps to run the website locally.

### Local Installation

Clone the repository

`git clone https://github.com/Z0G/static-website-on-aws`

`cd static-website-project`

Since this is a pure HTML/CSS/JS project, no build tools or dev servers are required.

You can simply open the main file in your browser:

Example:
`open index.html`

## ☁️ Deployment

Deployment is handled by uploading the final static files to the designated S3 bucket.

Deployment Steps
1. Prepare static files

Ensure all necessary files (HTML, CSS, JS, images) are included and organised properly.
These files are the final build artifacts.

2. Upload to S3

Upload the entire project folder (or output folder like ./dist) to your S3 bucket:

Bucket name: `yourdomain.com`

3. Invalidate CloudFront Cache (if updates don't show)


## 📝 License
This project is licensed under the APACHE License.

See the `LICENSE.md` file for details.

## ⭐️ Show Your Support
Give a ⭐️ if this project helped you!

## ⏭️ Next Steps & Roadmap
This project is currently stable, but I always look for ways to improve performance, features, and maintainability.

High Priority: Lead Capture
Form Integration: Integrate a dedicated sign-up/contact form on the homepage and/or a dedicated "Contact Us" page.

Backend Hookup: Connect the form submission to a serverless function (e.g., AWS Lambda) or a third-party service (e.g., Mailchimp, Formspree) for reliable data collection.

Validation & Feedback: Implement client-side validation and provide clear success/error messages to the user upon submission.
