// @ts-nocheck
import React from "react";
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
  }
  render() {
    // Check if the error is thrown
    if (this.state?.hasError) {
      // return (
      //   <>
      //   {this.props.children}
      //   </>
      // )
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
