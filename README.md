# AWS Cloud Resume

[![Cypress Test and Terraform Apply](https://github.com/IPpetrov/cloud-resume/actions/workflows/terraform.yml/badge.svg)](https://github.com/IPpetrov/cloud-resume/actions/workflows/terraform.yml)

[![Sync to AWS S3 and Invalidate CloudFront](https://github.com/IPpetrov/cloud-resume/actions/workflows/main.yml/badge.svg)](https://github.com/IPpetrov/cloud-resume/actions/workflows/main.yml)<br>
Technologies used: AWS S3, Route53, Certificates Manager, CloudFront, API Gateway, Lambda, DynamoDB, Terraform git, Github, Github Actions, Python (Boto3), HTML, CSS, JavaScript.<br>

![Architecture](https://github.com/IPpetrov/cloud-resume/blob/4e5512aedadbafe92f2f260586fd5064dc7c04e3/cloud%20architecture.png)

• Implemented Terraform scripts for streamlined creation of AWS infrastructure, reducing manual configuration.<br>
• Customized HTML layout utilizing CSS with Bootstrap.<br>
• Hosted HTML resume on Amazon S3 as a static website for efficient deployment.<br>
• Ensured website security by implementing HTTPS and integrating with Amazon CloudFront.<br>
• Established custom domain mapping to CloudFront distribution for personalized URL.<br>
• Implemented a redirect setup utilizing an additional S3 bucket and routing configurations, allowing seamless redirection from ip-petrov.com to the www version, enhancing user experience and ensuring consistent access to the website.<br>
• Developed a visitor tracking feature using JavaScript and DynamoDB for data storage.<br>
• Constructed an API through AWS API Gateway and Lambda services for dynamic content delivery.<br>
• Utilized Python Boto3 and Lambda functions to automate DynamoDB operations via API Gateway.<br>
• Managed backend and frontend code in a dedicated GitHub repository for version control.<br>
• Integrated Cypress Test into GitHub actions for continuous testing of both API and website functionality.<br>
• Implemented CI/CD pipelines with GitHub actions for automated deployment of backend and frontend resources using Terraform.<br>

### Website link:
https://www.ip-petrov.com/
