
import { render, screen, fireEvent } from '@testing-library/react';
import { AnimatedIcon } from '@/components/AnimatedIcon';

describe('AnimatedIcon', () => {
  const defaultProps = {
    name: 'test-icon',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  };

  it('renders without crashing', () => {
    render(<AnimatedIcon {...defaultProps} />);
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
  });

  it('applies correct size', () => {
    render(<AnimatedIcon {...defaultProps} size={32} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveStyle({ width: '32px', height: '32px' });
  });

  it('applies correct color', () => {
    render(<AnimatedIcon {...defaultProps} color="#ff0000" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveStyle({ color: '#ff0000' });
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<AnimatedIcon {...defaultProps} onClick={handleClick} />);
    const icon = screen.getByRole('img');
    fireEvent.click(icon);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles mouse enter events', () => {
    const handleMouseEnter = jest.fn();
    render(<AnimatedIcon {...defaultProps} onMouseEnter={handleMouseEnter} />);
    const icon = screen.getByRole('img');
    fireEvent.mouseEnter(icon);
    expect(handleMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('handles mouse leave events', () => {
    const handleMouseLeave = jest.fn();
    render(<AnimatedIcon {...defaultProps} onMouseLeave={handleMouseLeave} />);
    const icon = screen.getByRole('img');
    fireEvent.mouseLeave(icon);
    expect(handleMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('applies correct aria-label', () => {
    render(<AnimatedIcon {...defaultProps} ariaLabel="Custom label" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('aria-label', 'Custom label');
  });

  it('applies default aria-label when not provided', () => {
    render(<AnimatedIcon {...defaultProps} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('aria-label', 'test-icon icon');
  });

  it('applies disabled state correctly', () => {
    render(<AnimatedIcon {...defaultProps} disabled />);
    const icon = screen.getByRole('img', { hidden: true });
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon).toHaveAttribute('tabindex', '-1');
  });

  it('applies custom className', () => {
    render(<AnimatedIcon {...defaultProps} className="custom-class" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveClass('custom-class');
  });

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    render(<AnimatedIcon {...defaultProps} style={customStyle} />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveStyle({ backgroundColor: 'red' });
  });
});
